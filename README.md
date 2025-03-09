# User Registration System - Full Stack Project

This project implements a user registration system with a React.js frontend, a Node.js/Express backend, and a MongoDB database.  It provides full CRUD (Create, Read, Update, Delete) operations for user data.

## Table of Contents

1.  [Project Setup and Instructions](#project-setup-and-instructions)
    *   [Backend Setup (Node.js/Express)](#backend-setup-nodejs-express)
    *   [Frontend Setup (React.js)](#frontend-setup-reactjs)
    *   [Running the Application](#running-the-application)
2.  [REST API Documentation](#rest-api-documentation)
    *   [1. Create User (POST /api/users)](#1-create-user-post-apiusers)
    *   [2. Get All Users (GET /api/users)](#2-get-all-users-get-apiusers)
    *   [3. Get User by ID (GET /api/users/:id)](#3-get-user-by-id-get-apiusersid)
    *   [4. Get Gender Options (GET /api/users/gender/options)](#4-get-gender-options-get-apiusersgenderoptions)
    *   [5. Update User (PUT /api/users/:id)](#5-update-user-put-apiusersid)
    *   [6. Delete User (DELETE /api/users/:id)](#6-delete-user-delete-apiusersid)
3. [Database Design](#database-design)
4.  [Error Handling](#error-handling)

## Project Setup and Instructions

### Backend Setup (Node.js/Express)

1.  **Clone the repository (replace with your repository URL):**

    ```bash
    git clone https://github.com/harsh-kumar-patwa/registration-page/
    cd registration-page/server
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**  In the `server` directory, create a file named `.env` and add the following, replacing the placeholder with your actual MongoDB connection string:

    ```
    PORT=5000
    MONGODB_URI=<your_mongodb_connection_string>
    ```

    *   **For a local MongoDB instance,**  the connection string might look like: `mongodb://localhost:27017/your_database_name`
    *   **For MongoDB Atlas,** you'll get the connection string from your Atlas dashboard.  It will look something like:  `mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/your_database_name?retryWrites=true&w=majority`

    **Important:**  Securely manage your `MONGODB_URI`.  *Never* commit your actual database credentials to a public repository.  Consider using environment variables or a secrets management service in a production environment.

### Frontend Setup (React.js)

1.  **Navigate to the client directory:**

    ```bash
    cd ../client  # Or the name of your frontend directory
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    ```
3. **Configure API base URL (if needed):**
     Open `client/src/services/api.js` file
     ```javascript
     // client/src/services/api.js
        import axios from 'axios';

        const API_BASE_URL = 'http://localhost:5000/api'; // Update if your backend runs on a different port

        const api = axios.create({
          baseURL: API_BASE_URL,
        });
      ```
      If your backend server will run on a port other than 5000, update the `API_BASE_URL` constant in `client/src/services/api.js` accordingly.  This ensures your frontend makes requests to the correct backend endpoint.

### Running the Application

1.  **Start the backend server:**

    ```bash
    # From the /server directory
    npm start
    ```

    This will usually start the server on port 5000 (or the port you specified in your `.env` file).  You should see a message like "Server is running on port 5000" and "Connected to MongoDB" in your terminal.

2.  **Start the frontend (in a *separate* terminal window):**

    ```bash
    # From the /client directory
    npm start
    ```

    This will start the React development server, typically on port 3000.  Your browser should automatically open to `http://localhost:3000`.

3.  **Access the application:** Open your web browser and go to `http://localhost:3000` (or the URL indicated by the React development server).

## REST API Documentation

The API endpoints are all prefixed with `/api/users`.

### 1. Create User (POST /api/users)

Creates a new user.

*   **Request Body:**

    ```json
    {
        "name": "John Doe",
        "age": 30,
        "dateOfBirth": "1993-05-10",
        "password": "password123",
        "gender": "Male",
        "about": "A short bio about John."
    }
    ```

    *   `name`: (string, required, min length 2) The user's full name.
    *   `age`: (number, required, 0-120) The user's age.
    *   `dateOfBirth`: (string, required, valid date format: YYYY-MM-DD) The user's date of birth.
    *   `password`: (string, required, min length 10, alphanumeric, must contain at least one digit) The user's password.
    *   `gender`: (string, required, must be one of "Male", "Female", or "Other") The user's gender.
    *   `about`: (string, optional, max length 5000) A short description about the user.

*   **Success Response (201 Created):**

    ```json
    {
        "_id": "652d8967517987a7a58c7d66",
        "name": "John Doe",
        "age": 30,
        "dateOfBirth": "1993-05-10T00:00:00.000Z",
        "password": "password123",  // Note: In a real application, NEVER return the password.
        "gender": "Male",
        "about": "A short bio about John.",
        "createdAt": "2023-10-16T18:35:19.845Z",
        "updatedAt": "2023-10-16T18:35:19.845Z",
        "__v": 0
    }
    ```
    *Returns the newly created user object, including the generated `_id`.*

*   **Error Responses:**

    *   **400 Bad Request:** If required fields are missing, data is invalid, or the username already exists.

        ```json
        {
            "message": "Missing required fields"
        }
        ```
        ```json
        {
            "message": "Invalid date format"
        }
        ```

        ```json
        {
          "message": "Password must be alphanumeric and contain at least one digit"
        }
        ```
        ```json
          {
              "message": "User with this name already exists"
        }
        ```

    *   **500 Internal Server Error:**  If there's a server-side error.

        ```json
        {
            "message": "Internal Server Error"
        }
        ```

### 2. Get All Users (GET /api/users)

Retrieves a list of all registered users.

*   **Request:** No request body.

*   **Success Response (200 OK):**

    ```json
    [
        {
            "_id": "652d8967517987a7a58c7d66",
            "name": "John Doe",
            "age": 30,
            "dateOfBirth": "1993-05-10T00:00:00.000Z",
            "password": "password123", // NEVER return passwords in a real application
            "gender": "Male",
            "about": "A short bio about John.",
            "createdAt": "2023-10-16T18:35:19.845Z",
            "updatedAt": "2023-10-16T18:35:19.845Z",
            "__v": 0
        },
        {
            "_id": "652d8a44517987a7a58c7d67",
            "name": "Jane Smith",
            "age": 25,
            "dateOfBirth": "1998-12-20T00:00:00.000Z",
            "password": "securePass456",
            "gender": "Female",
            "about": "Another user.",
            "createdAt": "2023-10-16T18:39:00.123Z",
            "updatedAt": "2023-10-16T18:39:00.123Z",
            "__v": 0
        }
    ]
    ```
     *Returns an array of user objects.*

*   **Error Response (500 Internal Server Error):**  If there's a server-side error.

    ```json
    {
        "message": "Internal Server Error"
    }
    ```

### 3. Get User by ID (GET /api/users/:id)

Retrieves a single user by their ID.

*   **Request:**  No request body.  The `:id` in the URL is the user's ID.  For example: `/api/users/652d8967517987a7a58c7d66`

*   **Success Response (200 OK):**

    ```json
    {
        "_id": "652d8967517987a7a58c7d66",
        "name": "John Doe",
        "age": 30,
        "dateOfBirth": "1993-05-10T00:00:00.000Z",
        "password": "password123",  // NEVER return passwords!
        "gender": "Male",
        "about": "A short bio about John.",
        "createdAt": "2023-10-16T18:35:19.845Z",
        "updatedAt": "2023-10-16T18:35:19.845Z",
        "__v": 0
    }
    ```
     *Returns the user object if found.*

*   **Error Responses:**

    *   **400 Bad Request:** If the provided ID is not a valid MongoDB ObjectId.

        ```json
        {
            "message": "Invalid user ID"
        }
        ```

    *   **404 Not Found:** If no user is found with the given ID.

        ```json
        {
            "message": "User not found"
        }
        ```

    *   **500 Internal Server Error:** For other server errors.

        ```json
        {
            "message": "Internal Server Error"
        }
        ```
### 4. Get Gender Options (GET /api/users/gender/options)
Retrieves the list for gender.
*  **Request:** No request body.

* **Success Response (200 OK):**

    ```json
    [
      "Male",
      "Female",
      "Other"
    ]
    ```
### 5. Update User (PUT /api/users/:id)

Updates an existing user's information.

*   **Request Body:**  Similar to the Create User request, but you only need to include the fields you want to update.

    ```json
    {
        "name": "Johnathan Doe",
        "age": 31
    }
    ```

*   **Success Response (200 OK):**

    ```json
    {
        "_id": "652d8967517987a7a58c7d66",
        "name": "Johnathan Doe",  // Updated name
        "age": 31,              // Updated age
        "dateOfBirth": "1993-05-10T00:00:00.000Z",
        "password": "password123",  // NEVER return passwords
        "gender": "Male",
        "about": "A short bio about John.",
        "createdAt": "2023-10-16T18:35:19.845Z",
        "updatedAt": "2023-10-16T19:00:00.000Z", // Updated updatedAt
        "__v": 0
    }
    ```
     *Returns the updated user object.*

*   **Error Responses:**  Similar to Create User and Get User by ID.

    *   **400 Bad Request:** Invalid data, missing fields, etc.
    *   **404 Not Found:** User with the given ID not found.
    *   **500 Internal Server Error:** Server error.

### 6. Delete User (DELETE /api/users/:id)

Deletes a user by their ID.

*   **Request:** No request body.  The `:id` in the URL is the user's ID.

*   **Success Response (200 OK):**

    ```json
    {
        "message": "User deleted"
    }
    ```

*   **Error Responses:**

    *   **400 Bad Request:** Invalid user ID.
    *   **404 Not Found:** User with the given ID not found.
    *   **500 Internal Server Error:** Server error.

## Database Design

The application uses a single MongoDB collection named `users`.  Each document in the collection represents a user and has the following schema (defined in `server/models/User.js`):

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    age: { type: Number, required: true, min: 0, max: 120 },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true, minlength: 10 },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    about: { type: String, maxlength: 5000 },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;

```
``` javascript
_id: (ObjectId, automatically generated) - Unique identifier for the user.
name: (String) - User's full name.
age: (Number) - User's age.
dateOfBirth: (Date) - User's date of birth.
password: (String) - User's password (hashed in a real application).
gender: (String) - User's gender.
about: (String) - A short description about the user.
createdAt: (Date) - Timestamp indicating when the user was created.
updatedAt: (Date) - Timestamp indicating when the user was last updated.
```

## Error Handling
The backend API implements basic error handling:

* Input Validation: Checks for required fields, data types, and valid ranges/formats. Returns 400 Bad Request for invalid input.
* Duplicate User Check: Prevents creating users with the same name (you might want to use email as a unique identifier in a real application). Returns a 400 Bad Request if a user with the same name already exists.
