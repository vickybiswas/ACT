# ACT
AI Crafted for Trade -> AI that an organization can use and get value out of.

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Node.js
- Python 3.8+
- SQLite

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
4. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## Running Instructions

### Using Docker Compose
1. Ensure Docker and Docker Compose are installed on your machine.
2. Navigate to the root directory of the project.
3. Run the following command to start the services:
   ```sh
   docker-compose up --build
   ```

### Accessing the Application
- Frontend: Open your browser and navigate to `http://localhost:3000`
- Backend: The FastAPI backend will be available at `http://localhost:8000`

## Usage Instructions

### Adding Names and Numbers
1. Open the frontend application in your browser.
2. Enter the names and numbers in the provided input fields.
3. Click the "Save" button to save the data.

### Syncing Data
1. Click the "Sync" button to sync data between the SQLite database and DynamoDB.
2. The application will prioritize old data from DynamoDB and new data from SQLite.

## Additional Information
- The application uses a FastAPI backend to handle API requests and interact with DynamoDB.
- The frontend is built using React and saves data in a SQLite database on the client side.
- Docker Compose is used to manage the frontend, backend, and local DynamoDB services.
