# ACT
AI Crafted for Trade -> AI that an organization can use and get value out of.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Python 3.7+ installed
- SQLite installed
- AWS account with DynamoDB setup
- Docker and Docker Compose installed

### Frontend (PWA)

1. Clone the repository:
   ```sh
   git clone https://github.com/vickybiswas/ACT.git
   cd ACT
   ```

2. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```sh
   uvicorn app.main:app --reload
   ```

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed.

2. Clone the repository:
   ```sh
   git clone https://github.com/vickybiswas/ACT.git
   cd ACT
   ```

3. Start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

## Running Instructions

### Frontend (PWA)

1. Ensure the development server is running:
   ```sh
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Backend (FastAPI)

1. Ensure the FastAPI server is running:
   ```sh
   uvicorn app.main:app --reload
   ```

2. The API documentation will be available at:
   ```
   http://localhost:8000/docs
   ```

3. The API can be accessed at:
   ```
   http://localhost:8000
   ```

### Using Docker Compose

1. Ensure the services are running using Docker Compose:
   ```sh
   docker-compose up --build
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. The API documentation will be available at:
   ```
   http://localhost:8000/docs
   ```

4. The API can be accessed at:
   ```
   http://localhost:8000
   ```
