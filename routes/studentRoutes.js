const express = require("express");
const router = express.Router();

const db = require("../db");


// GET ALL STUDENTS
router.get("/", function(req, res) {

    db.all(
        "SELECT * FROM students ORDER BY id DESC",
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


// GET ONE STUDENT
router.get("/:id", function(req, res) {

    db.get(
        "SELECT * FROM students WHERE id = ?",
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


// CREATE STUDENT
router.post("/", function(req, res) {

    const {
        name,
        studentClass,
        photo,
        video
    } = req.body;

    if (!name || !studentClass) {
        return res.status(400).json({
            error: "Name and class are required"
        });
    }

    db.run(
        `
        INSERT INTO students
        (name, class, photo, video)
        VALUES (?, ?, ?, ?)
        `,
        [
            name,
            studentClass,
            photo || "",
            video || ""
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Student added successfully",
                id: this.lastID
            });
        }
    );
});


// UPDATE STUDENT
router.put("/:id", function(req, res) {

    const {
        name,
        studentClass,
        photo,
        video
    } = req.body;

    db.run(
        `
        UPDATE students
        SET name = ?,
            class = ?,
            photo = ?,
            video = ?
        WHERE id = ?
        `,
        [
            name,
            studentClass,
            photo || "",
            video || "",
            req.params.id
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Student updated successfully"
            });
        }
    );
});


// DELETE STUDENT
router.delete("/:id", function(req, res) {

    db.run(
        "DELETE FROM students WHERE id = ?",
        [req.params.id],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Student deleted successfully"
            });
        }
    );
});


module.exports = router;