import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('NamesNumbers')

def insert_name(name_id, name):
    try:
        table.put_item(Item={"id": name_id, "name": name})
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error inserting name: {str(e)}")

def update_name(name_id, name):
    try:
        table.update_item(
            Key={"id": name_id},
            UpdateExpression="set #n = :n",
            ExpressionAttributeNames={"#n": "name"},
            ExpressionAttributeValues={":n": name}
        )
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error updating name: {str(e)}")

def delete_name(name_id):
    try:
        table.delete_item(Key={"id": name_id})
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error deleting name: {str(e)}")

def fetch_names():
    try:
        response = table.scan()
        return response['Items']
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error fetching names: {str(e)}")

def insert_number(number_id, number):
    try:
        table.put_item(Item={"id": number_id, "number": number})
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error inserting number: {str(e)}")

def update_number(number_id, number):
    try:
        table.update_item(
            Key={"id": number_id},
            UpdateExpression="set #n = :n",
            ExpressionAttributeNames={"#n": "number"},
            ExpressionAttributeValues={":n": number}
        )
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error updating number: {str(e)}")

def delete_number(number_id):
    try:
        table.delete_item(Key={"id": number_id})
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error deleting number: {str(e)}")

def fetch_numbers():
    try:
        response = table.scan()
        return response['Items']
    except (NoCredentialsError, PartialCredentialsError) as e:
        raise Exception(f"Error fetching numbers: {str(e)}")
