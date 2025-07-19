
### Backend README.md

```markdown
# BookBeacon - Library Management System (Backend)

## Overview
The BookBeacon backend is a RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to support the frontend of a minimal library management system. It provides endpoints for CRUD operations on books and borrowing functionalities, with proper error handling and pagination support. The backend follows a modular MVC pattern for maintainability and scalability.

- **Live API**: [BookBeacon Backend](https://book-beacon-backend.vercel.app/)


## Features
- **Book Management**:
  - CRUD operations for books (create, read, update, delete).
  - Schema: Title, Author, Genre, ISBN, Description, Copies, Available.
  - Business logic: Books with 0 copies are marked unavailable.
- **Borrow Management**:
  - Create and retrieve borrow records with fields: Book ID, Quantity, Due Date.
  - Ensures borrowed quantity does not exceed available copies.
  - Aggregated borrow summary endpoint.
- **Pagination**: Supports paginated book listings.
- **Error Handling**: Consistent, user-friendly error messages.
- **Database**: MongoDB with Mongoose for schema-based data modeling.

## API Endpoints
- **Books**:
  - `GET /api/books`: Retrieve paginated list of books.
  - `GET /api/books/:id`: Get details of a specific book.
  - `POST /api/books`: Create a new book.
  - `PUT /api/books/:id`: Update an existing book.
  - `DELETE /api/books/:id`: Delete a book.
- **Borrow**:
  - `POST /api/borrow`: Borrow a book with quantity and due date.
  - `GET /api/borrow`: Retrieve aggregated borrow summary.

## Technology Stack
- **Framework**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Architecture**: Modular MVC pattern

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/book-beacon-backend.git
   cd book-beacon-backend