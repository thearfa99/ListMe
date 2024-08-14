# ListME

ListMe is a full-stack To-Do List application built with React, Node.js, Express, and MongoDB. The app allows users to create an account, log in, and manage their to-do tasks. Each task can be added, marked as complete, and deleted.

## Features

- User Authentication: Create an account and log in securely.
- Task Management: Add, update, mark as complete, and delete tasks.
- Automatic Mailing: Once a task is marked complete user recieves a mail.
- Persistent Storage: Tasks are stored in a MongoDB database.
- JWT Authentication: Secure API endpoints with JSON Web Tokens.

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, jsonwebtoken
- **Mailing Server**: Postmark
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- A MongoDB connection string

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/thearfa99/mern.git
cd mern
```
### 2. Backend Setup

Navigate to the backend directory:
```
cd server
```
Install the dependencies:
```
npm install
```
Create a .env file in the backend directory and add your JWT secret:
```
touch .env
```
Add the following lines to the .env file:
```
EMAIL_USER=your_sender_email
POSTMARK_API_TOKEN=your_postmark_api
ACCESS_TOKEN_SECRET=your_secret_key
```
Create a config.json file in the backend directory and add your MongoDB connection string:
```
{
  "connectionString": "your_mongo_connection_string"
}
```
Start the backend server:
```
npm start
```
### 3. Frontend Setup
Navigate to the frontend directory:
```
cd client
```
Install the dependencies:
```
npm install
```
Start the frontend development server:
```
npm run dev
```
### 4. Usage
Open your browser and navigate to http://localhost:5173/ to see the frontend.

Use Postman or any other API client to test the backend API endpoints.
Also Ensure to setup a postmark sever to ensure automatic mailing

#### API Endpoints
User Authentication:
- POST /create-account: Create a new user account.
- POST /login: Log in with an existing account.
- GET /get-user: Get the current user's information (requires authentication).

Task Management:
- GET /tasks: Gets all the tasks associated with the logged in user (requires authentication).
- POST /add-task: Add a new task (requires authentication).
- POST /update-task/:id : Update an existing task (requires authentication).
- DELETE /delete-task/:id : Delete a task (requires authentication).
