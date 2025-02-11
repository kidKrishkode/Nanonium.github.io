# Install necessary libraries
# !pip install transformers datasets torch numpy scikit-learn

# Import required libraries
import os
import json
import torch
import numpy as np
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from torch.utils.data import Dataset

# Define dataset directory structure
DATASET_PATH = "./Dataset"

# Function to load JSON data
def load_json_data(folder, category):
    file_path = os.path.join(DATASET_PATH, folder, f"{category}.json")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

# Load student training, testing, and validation data
train_data = load_json_data("training", "students")
test_data = load_json_data("testing", "students")
val_data = load_json_data("validation", "students")

# Load keymap for keyword expansion
keymap = load_json_data("keymap", "students")

# Function to preprocess data
def preprocess_data(data):
    inputs, outputs = [], []
    for item in data:
        user_query = item["user_input"]
        sql_query = item["sql_query"]

        # Replace keymap words with variations for better generalization
        for key, synonyms in keymap.items():
            for synonym in synonyms:
                if synonym in user_query:
                    user_query = user_query.replace(synonym, key)

        inputs.append(user_query)
        outputs.append(sql_query)
    return inputs, outputs

# Preprocess datasets
train_inputs, train_outputs = preprocess_data(train_data)
test_inputs, test_outputs = preprocess_data(test_data)
val_inputs, val_outputs = preprocess_data(val_data)

# Load pre-trained T5 tokenizer
tokenizer = T5Tokenizer.from_pretrained("t5-small")

# Tokenization function
def tokenize_function(inputs, outputs):
    return tokenizer(inputs, padding="max_length", truncation=True, max_length=128, return_tensors="pt"), \
           tokenizer(outputs, padding="max_length", truncation=True, max_length=128, return_tensors="pt")

# Tokenize datasets
train_encodings, train_labels = tokenize_function(train_inputs, train_outputs)
test_encodings, test_labels = tokenize_function(test_inputs, test_outputs)
val_encodings, val_labels = tokenize_function(val_inputs, val_outputs)

# Create PyTorch Dataset class
class SQLDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels["input_ids"])

    def __getitem__(self, idx):
        return {
            "input_ids": torch.tensor(self.encodings["input_ids"][idx]),
            "attention_mask": torch.tensor(self.encodings["attention_mask"][idx]),
            "labels": torch.tensor(self.labels["input_ids"][idx])
        }

# Create dataset instances
train_dataset = SQLDataset(train_encodings, train_labels)
test_dataset = SQLDataset(test_encodings, test_labels)
val_dataset = SQLDataset(val_encodings, val_labels)

# Load pre-trained T5 model for text generation
model = T5ForConditionalGeneration.from_pretrained("t5-small")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=3e-4,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=10,
    weight_decay=0.01,
    load_best_model_at_end=True
)

# Define Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset
)

# Train the model
trainer.train()

# Evaluate model on test dataset
results = trainer.evaluate(test_dataset)
print("Test Loss:", results["eval_loss"])

# Function to generate SQL queries from user input
def generate_sql(user_query):
    model.eval()
    user_query = tokenizer(user_query, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    user_query = {key: val.to(device) for key, val in user_query.items()}
    
    with torch.no_grad():
        output_ids = model.generate(**user_query, max_length=128)
    
    sql_query = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return sql_query

# Example testing
sample_input = "Show all students who scored above 80 in Mathematics"
generated_sql = generate_sql(sample_input)
print("Generated SQL:", generated_sql)