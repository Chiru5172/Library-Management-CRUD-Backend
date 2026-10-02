const express = require("express");
const router = express.Router();

const db = require("../db");


// GET ALL BOOKS
router.get("/", function(req, res) {

    db.all(
        "SELECT * FROM books ORDER BY id DESC",
        [],
        function(error, rows) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json(rows);
        }
    );
});


// GET ONE BOOK
router.get("/:id", function(req, res) {

    db.get(
        "SELECT * FROM books WHERE id = ?",
        [req.params.id],
        function(error, row) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json(row);
        }
    );
});


// CREATE BOOK
router.post("/", function(req, res) {

    const {
        name,
        author,
        publication,
        year
    } = req.body;

    if (!name || !author) {
        return res.status(400).json({
            error: "Book name and author are required"
        });
    }

    db.run(
        `
        INSERT INTO books
        (name, author, publication, year)
        VALUES (?, ?, ?, ?)
        `,
        [
            name,
            author,
            publication || "",
            year || null
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Book added successfully",
                id: this.lastID
            });
        }
    );
});


// UPDATE BOOK
router.put("/:id", function(req, res) {

    const {
        name,
        author,
        publication,
        year
    } = req.body;

    db.run(
        `
        UPDATE books
        SET name = ?,
            author = ?,
            publication = ?,
            year = ?
        WHERE id = ?
        `,
        [
            name,
            author,
            publication || "",
            year || null,
            req.params.id
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Book updated successfully"
            });
        }
    );
});


// DELETE BOOK
router.delete("/:id", function(req, res) {

    db.run(
        "DELETE FROM books WHERE id = ?",
        [req.params.id],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Book deleted successfully"
            });
        }
    );
});


module.exports = router;