# Library System

## Overview

Welcome to the Library System project, a comprehensive backend solution with an Angular 18-based interface designed to manage a library's operations efficiently. This project leverages modern web technologies to provide a robust platform for managing books, users, and their interactions within the library.

Built using Node.js and Express on the backend and Angular 18 for the frontend, this system supports functionalities such as user registration and authentication, book management (including additions, updates, deletions), and the ability to borrow and return books. The MongoDB database is used for storing all data securely and efficiently, ensuring that user and book information is easily accessible and manageable.

The system includes detailed API endpoints that allow clients to interact seamlessly with the library's database. These endpoints are well-documented in this README to help developers understand and integrate the library's functionalities into any frontend system effectively. Bootstrap 5.3.3 is utilized to style the frontend, ensuring that the user interface is responsive and visually appealing.

Whether you are developing a full-fledged library management system or integrating with existing software, this project provides the necessary backend APIs and a frontend framework to meet your needs. Detailed below are the setup instructions, npm module requirements, API endpoint descriptions, and example curl commands for testing the functionality of the system.


## Project Setup

### Required npm Modules:
- `express`: for server operations
- `mongoose`: for MongoDB database management
- `bcrypt`: for password hashing
- `jsonwebtoken` (JWT): for handling authentication tokens
- `body-parser` (now included in Express): for parsing incoming request bodies
- `cors`: for enabling cross-origin resource sharing in APIs
- `bootstrap`: for responsive styling of the frontend (v.5.3.3)
- `curl`: for testing APIs by making HTTP requests from the command line

## API Endpoints

### User Management

1. **Create User**
   - **Endpoint:** `POST /api/users/`
   - **Description:** Registers a new user by hashing the password and storing user information.
   - **Request Body:** 
     ```json
     {
       "username": "newuser",
       "email": "newuser@example.com",
       "password": "password123"
     }
     ```
   - **Response:** `201 Created` on success, includes a message that the user was created.
   - **Curl Command:**
     ```bash
     curl -X POST http://localhost:3000/api/users/ -d 'username=newuser&email=newuser@example.com&password=password123'
     ```

2. **User Login**
   - **Endpoint:** `POST /api/users/login`
   - **Description:** Authenticates user by comparing the hashed password and returns a JWT token.
   - **Request Body:**
     ```json
     {
       "username": "existinguser",
       "password": "password123"
     }
     ```
   - **Response:** `200 OK` on success, returns a JWT token and username.
   - **Curl Command:**
     ```bash
     curl -X POST http://localhost:3000/api/users/login -d 'username=existinguser&password=password123'
     ```

### Book Management

3. **Fetch All Books**
   - **Endpoint:** `GET /api/books/`
   - **Description:** Retrieves all books from the database. Supports optional query parameters for search and genre to filter results.
   - **Query Parameters:** `search` for text search across multiple fields, `genre` for filtering by specific genre.
   - **Response:** Array of books.
   - **Curl Command:**
     ```bash
     curl http://localhost:3000/api/books/
     ```

4. **Fetch Book by ID**
   - **Endpoint:** `GET /api/books/:bookID`
   - **Description:** Retrieves a single book by its ID.
   - **Response:** Book object on success, `404 Not Found` if the book does not exist.
   - **Curl Command:**
     ```bash
     curl http://localhost:3000/api/books/123
     ```

5. **Search Books by Any Field**
   - **Description:** Searches across multiple book fields based on user input.
   - **Query Parameters:** `search`: The keyword to search across book fields like title, author, ISBN, and genre.
   - **Response:** Returns an array of book objects that match the search criteria across specified fields. If no books are found, returns an empty array.
   - **Curl Example:**
     ```bash
     curl -X GET "http://localhost:3000/api/books?search=harry"
     ```

6. **Search Books by Genre**
   - **Description:** Fetches books specifically filtered by genre.
   - **Query Parameters:** `genre`: The specific genre to filter books by.
   - **Response:** Returns an array of books that exclusively match the specified genre. If no books match, returns an empty array.
   - **Curl Example:**
     ```bash
     curl -X GET "http://localhost:3000/api/books?genre=fiction"
     ```

7. **Update Book**
   - **Endpoint:** `PUT /api/books/edit/:bookID`
   - **Description:** Updates an existing book's details in the database.
   - **Request Body:**
     ```json
     {
       "title": "Updated Title",
       "author": "Updated Author"
     }
     ```
   - **Response:** Updated book object, `404 Not Found` if the book does not exist.
   - **Curl Command:**
     ```bash
     curl -X PUT http://localhost:3000/api/books/edit/123 -d 'title=Updated Title&author=Updated Author'
     ```

8. **Delete Book**
   - **Endpoint:** `DELETE /api/books/delete/:bookID`
   - **Description:** Removes a book from the database.
   - **Response:** `200 OK` on successful deletion, includes a success message.
   - **Curl Command:**
     ```bash
     curl -X DELETE http://localhost:3000/api/books/delete/123
     ```

9. **Borrow a Book**
   - **Endpoint:** `PUT /api/books/borrow/:bookID`
   - **Description:** Marks a book as borrowed by a user.
   - **Request Body:**
     ```json
     {
       "userID": "user123"
     }
     ```
   - **Response:** Updated book object, indicating it is borrowed.
   - **Curl Command:**
     ```bash
     curl -X PUT http://localhost:3000/api/books/borrow/123 -d 'userID=user123'
     ```

10. **Return a Book**
    - **Endpoint:** `PUT /api/books/return/:bookID`
    - **Description:** Marks a book as returned and available.
    - **Request Body:**
      ```json
      {
       "userID": "user123"
      }
      ```
    - **Response:** Updated book object, indicating it is returned.
    - **Curl Command:**
      ```bash
      curl -X PUT http://localhost:3000/api/books/return/123 -d 'userID=user123'
      ```
