import { pipeline } from "@xenova/transformers";
import * as ort from "onnxruntime-node";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

// **Fix for __dirname in ES modules**
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// **Step 1: Load the Tokenizer and Model**
async function setup() {
    const tokenizer = await pipeline("text2text-generation", "Xenova/t5-small");
    const model = await ort.InferenceSession.create(path.resolve(__dirname, "./model/O1 Model/o1.onnx"));
    return { tokenizer, model };
}

// **Step 2: Convert User Input to Model Input**
async function tokenizeInput(user_question, tokenizer) {
    const encoded = await tokenizer.tokenizer(user_question, { padding: true, truncation: true, max_length: 128 });

    return {
        input_ids: new ort.Tensor("int64", BigInt64Array.from(encoded.input_ids), [1, encoded.input_ids.length]),
        decoder_input_ids: new ort.Tensor("int64", BigInt64Array.from([0]), [1, 1]) // BOS token
    };
}

// **Step 3: Run the Model and Get SQL Output**
async function generateSQL(user_question) {
    try {
        const { tokenizer, model } = await setup();
        const inputs = await tokenizeInput(user_question, tokenizer);

        // Run ONNX Model
        const results = await model.run(inputs);
        const output_ids = results["output"].data;

        // Convert token IDs back to string (SQL query)
        const sql_query = tokenizer.tokenizer.decode(output_ids);

        console.log("Generated SQL:", sql_query);
        return sql_query;
    } catch (error) {
        console.error("Error running model:", error);
    }
}

// **Step 4: Example Usage**
const user_question = "Show all students who scored above 80 in Mathematics";
generateSQL(user_question);
