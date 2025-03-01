import os
import onnxruntime as ort
import tensorflow as tf
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from transformers import T5Tokenizer

# FastAPI app initialization
app = FastAPI()

# Load tokenizer
tokenizer = T5Tokenizer.from_pretrained("t5-small")

# Detect whether to use ONNX or Keras
USE_ONNX = os.path.exists("../model/O1 Model/model.onnx")
USE_KERAS = os.path.exists("../model/O1 Model/o1.keras")

# Load ONNX model
if USE_ONNX:
    onnx_session = ort.InferenceSession("../model/O1 Model/model.onnx")
    print("ONNX model loaded successfully.")

# Load Keras model
elif USE_KERAS:
    keras_model = tf.keras.models.load_model("../model/O1 Model/o1.keras")
    print("Keras model loaded successfully.")
else:
    raise Exception("No model found! Ensure either 'model.onnx' or 'o1.keras' exists.")

# Request model for user input
class QueryRequest(BaseModel):
    user_query: str

@app.post("/generate-sql")
def generate_sql(request: QueryRequest):
    user_query = request.user_query

    # Tokenize input
    encoded_input = tokenizer(user_query, return_tensors="np", padding="max_length", truncation=True, max_length=128)
    
    if USE_ONNX:
        input_ids = encoded_input["input_ids"].astype("int64")
        attention_mask = encoded_input["attention_mask"].astype("int64")
        ort_inputs = {"input_ids": input_ids, "attention_mask": attention_mask}
        ort_output = onnx_session.run(None, ort_inputs)
        output_ids = ort_output[0]
    elif USE_KERAS:
        input_ids = encoded_input["input_ids"]
        output_ids = keras_model.predict(input_ids)
    
    # Decode output to SQL query
    sql_query = tokenizer.decode(output_ids[0], skip_special_tokens=True)


    return {"sql_query": sql_query}
