from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

app = FastAPI()

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('NamesNumbers')

class Name(BaseModel):
    id: int
    name: str

class Number(BaseModel):
    id: int
    number: str

class SyncData(BaseModel):
    names: List[Name]
    numbers: List[Number]

@app.post("/sync")
async def sync_data(data: SyncData):
    try:
        with table.batch_writer() as batch:
            for name in data.names:
                batch.put_item(Item={"id": name.id, "name": name.name})
            for number in data.numbers:
                batch.put_item(Item={"id": number.id, "number": number.number})
        return {"message": "Data synced successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/names")
async def create_name(name: Name):
    try:
        table.put_item(Item={"id": name.id, "name": name.name})
        return {"message": "Name added successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/names")
async def read_names():
    try:
        response = table.scan()
        return response['Items']
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/names/{name_id}")
async def update_name(name_id: int, name: Name):
    try:
        table.update_item(
            Key={"id": name_id},
            UpdateExpression="set #n = :n",
            ExpressionAttributeNames={"#n": "name"},
            ExpressionAttributeValues={":n": name.name}
        )
        return {"message": "Name updated successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/names/{name_id}")
async def delete_name(name_id: int):
    try:
        table.delete_item(Key={"id": name_id})
        return {"message": "Name deleted successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/numbers")
async def create_number(number: Number):
    try:
        table.put_item(Item={"id": number.id, "number": number.number})
        return {"message": "Number added successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/numbers")
async def read_numbers():
    try:
        response = table.scan()
        return response['Items']
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/numbers/{number_id}")
async def update_number(number_id: int, number: Number):
    try:
        table.update_item(
            Key={"id": number_id},
            UpdateExpression="set #n = :n",
            ExpressionAttributeNames={"#n": "number"},
            ExpressionAttributeValues={":n": number.number}
        )
        return {"message": "Number updated successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/numbers/{number_id}")
async def delete_number(number_id: int):
    try:
        table.delete_item(Key={"id": number_id})
        return {"message": "Number deleted successfully"}
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise HTTPException(status_code=500, detail=str(e))
