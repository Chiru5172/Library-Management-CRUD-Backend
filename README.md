# Library Management System - Backend

This is the backend REST API for the Library Management System.

The backend is developed using Node.js and Express.js. SQLite is used as the database for storing students, books and library transaction records.

---

## Features

The backend provides REST APIs for three main modules:

1. Student Management
2. Book Management
3. Library Management

---

# Student Management

Student records contain:

- ID
- Name
- Class
- Photo
- Video

Available operations:

- Create student
- Get all students
- Get a single student
- Update student
- Delete student

---

# Book Management

Book records contain:

- ID
- Name
- Author
- Publication
- Year

Available operations:

- Create book
- Get all books
- Get a single book
- Update book
- Delete book

---

# Library Management

Library records connect students and books.

Library records contain:

- ID
- Student ID
- Book ID
- Start date
- End date

Available operations:

- Issue book
- Get library records
- Update library record
- Delete library record

---

# Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite3
- CORS
- REST API
- JavaScript

---

# Project Structure

```text
backend/
│
├── database/
│   └── library.db
│
├── routes/
│   ├── studentRoutes.js
│   ├── bookRoutes.js
│   └── libraryRoutes.js
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
└── README.md