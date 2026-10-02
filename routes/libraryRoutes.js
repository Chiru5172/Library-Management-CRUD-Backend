const express = require("express");
const router = express.Router();

const db = require("../db");


// GET ALL LIBRARY RECORDS
router.get("/", function(req, res) {

    const query = `
        SELECT
            library.id,
            library.student_id,
            library.book_id,
            students.name AS student_name,
            books.name AS book_name,
            library.start_date,
            library.end_date

        FROM library

        JOIN students
        ON library.student_id = students.id

        JOIN books
        ON library.book_id = books.id

        ORDER BY library.id DESC
    `;

    db.all(query, [], function(error, rows) {

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        res.json(rows);
    });
});


// CREATE LIBRARY RECORD
router.post("/", function(req, res) {

    const {
        student_id,
        book_id,
        start_date,
        end_date
    } = req.body;

    if (
        !student_id ||
        !book_id ||
        !start_date ||
        !end_date
    ) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    db.run(
        `
        INSERT INTO library
        (student_id, book_id, start_date, end_date)
        VALUES (?, ?, ?, ?)
        `,
        [
            student_id,
            book_id,
            start_date,
            end_date
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Book issued successfully",
                id: this.lastID
            });
        }
    );
});


// UPDATE LIBRARY RECORD
router.put("/:id", function(req, res) {

    const {
        student_id,
        book_id,
        start_date,
        end_date
    } = req.body;

    db.run(
        `
        UPDATE library

        SET student_id = ?,
            book_id = ?,
            start_date = ?,
            end_date = ?

        WHERE id = ?
        `,
        [
            student_id,
            book_id,
            start_date,
            end_date,
            req.params.id
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Library record updated successfully"
            });
        }
    );
});


// DELETE LIBRARY RECORD
router.delete("/:id", function(req, res) {

    db.run(
        "DELETE FROM library WHERE id = ?",
        [req.params.id],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Library record deleted successfully"
            });
        }
    );
});


module.exports = router;