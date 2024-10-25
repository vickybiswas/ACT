from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn
from .db import (
    create_dynamodb_table,
    insert_data_dynamodb,
    update_data_dynamodb,
    delete_data_dynamodb,
    fetch_data_dynamodb,
)

app = FastAPI()

class NameNumber(BaseModel):
    id: int
    name: str
    number: str

@app.on_event("startup")
async def startup_event():
    create_dynamodb_table()

@app.post("/names_numbers/", response_model=NameNumber)
async def create_name_number(name_number: NameNumber):
    try:
        insert_data_dynamodb(name_number.id, name_number.name, name_number.number)
        return name_number
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/names_numbers/", response_model=List[NameNumber])
async def read_names_numbers():
    try:
        return fetch_data_dynamodb()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/names_numbers/{name_number_id}", response_model=NameNumber)
async def update_name_number(name_number_id: int, name_number: NameNumber):
    try:
        update_data_dynamodb(name_number_id, name_number.name, name_number.number)
        return name_number
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/names_numbers/{name_number_id}")
async def delete_name_number(name_number_id: int):
    try:
        delete_data_dynamodb(name_number_id)
        return {"message": "Name and number deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
