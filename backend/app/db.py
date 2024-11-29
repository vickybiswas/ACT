import boto3
from botocore.exceptions import ClientError
import os

dynamodb = boto3.resource(
    'dynamodb',
    region_name=os.getenv('AWS_DEFAULT_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)
table_name = 'NamesNumbers'

def create_dynamodb_table():
    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'id',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'id',
                    'AttributeType': 'N'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        table.wait_until_exists()
    except ClientError as e:
        if e.response['Error']['Code'] != 'ResourceInUseException':
            raise

def insert_data_dynamodb(id, name, number):
    table = dynamodb.Table(table_name)
    table.put_item(
        Item={
            'id': id,
            'name': name,
            'number': number
        }
    )

def update_data_dynamodb(id, name, number):
    table = dynamodb.Table(table_name)
    table.update_item(
        Key={
            'id': id
        },
        UpdateExpression='SET #name = :name, #number = :number',
        ExpressionAttributeNames={
            '#name': 'name',
            '#number': 'number'
        },
        ExpressionAttributeValues={
            ':name': name,
            ':number': number
        }
    )

def delete_data_dynamodb(id):
    table = dynamodb.Table(table_name)
    table.delete_item(
        Key={
            'id': id
        }
    )

def fetch_data_dynamodb():
    table = dynamodb.Table(table_name)
    response = table.scan()
    return response['Items']
