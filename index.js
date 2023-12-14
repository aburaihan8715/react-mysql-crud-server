import express from "express";
const app = express();
import "dotenv/config";
import mysql from "mysql";
import cors from "cors";
const port = process.env.SERVER_PORT || 5001;

// middleware
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "react_crud_mysql_book",
});

// home route
app.get("/", (req, res) => {
  res.send({ message: "Hello from server" });
});

// post book
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// get specific book
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// delete book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// update book
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// client error
app.use((req, res, next) => {
  res.send({ message: "route not found" });
});
// server error
app.get((err, req, res, next) => {
  res.send({ message: "server error" });
});

// =====server running here =====
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
