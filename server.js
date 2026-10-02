const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./db");

const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/library", libraryRoutes);

app.get("/", function(req, res) {
    res.send("Library CRUD API is running");
});

const PORT = 5000;

app.listen(PORT, function() {
    console.log(`Server running on http://localhost:${PORT}`);
});