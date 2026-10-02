const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./database/library.db",
    function(error) {
        if (error) {
            console.log("Database connection error:", error.message);
        } else {
            console.log("SQLite database connected");
        }
    }
);

db.serialize(function() {

    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class TEXT NOT NULL,
            photo TEXT,
            video TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author TEXT NOT NULL,
            publication TEXT,
            year INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            book_id INTEGER NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,

            FOREIGN KEY (student_id)
                REFERENCES students(id),

            FOREIGN KEY (book_id)
                REFERENCES books(id)
        )
    `);

});

module.exports = db;