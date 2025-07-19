# BookBeacon - Library Management System (Frontend)

## Overview
BookBeacon is a minimal library management system built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**. It provides a clean, responsive, and user-friendly interface for managing books and borrowing operations without authentication. The frontend interacts with a RESTful backend API to perform CRUD operations on books and manage borrowing functionalities.

- **Live Demo**: [BookBeacon Frontend](https://bookbeacon-library-management.vercel.app/)


## Features
- **Public Routes**: All pages are accessible without authentication.
- **Book Management**:
  - **Book List**: Displays books in a table with columns: Title, Author, Genre, ISBN, Copies, Availability, and Actions (Edit, Delete, Borrow).
  - **Add Book**: Form to create a new book with fields: Title, Author, Genre, ISBN, Description, Copies, and optional Availability (defaults to true).
  - **Edit Book**: Pre-filled form to update book details, with instant UI updates via API.
  - **Delete Book**: Confirmation dialog before deletion.
  - **Borrow Book**: Form to borrow a book with Quantity and Due Date fields, ensuring quantity does not exceed available copies.
- **Borrow Summary**: Aggregated list of borrowed books with Book Title, ISBN, and Total Quantity Borrowed.
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop using Tailwind CSS.
- **Bonus Features**:
  - Optimistic UI updates for faster user experience.
  - Toast notifications for success/error feedback.
  - Type-safe forms with TypeScript for robust input validation.

## Pages
- `/books`: Lists all books with actions to view, edit, delete, or borrow.
- `/create-book`: Form to add a new book.
- `/books/:id`: Detailed view of a single book.
- `/edit-book/:id`: Form to edit an existing book.
- `/borrow/:bookId`: Form to borrow a book.
- `/borrow-summary`: Aggregated summary of borrowed books.

## Technology Stack
- **Framework**: React, TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS
- **API Integration**: RTK Query for type-safe API calls

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/book-beacon-frontend.git
   cd book-beacon-frontend