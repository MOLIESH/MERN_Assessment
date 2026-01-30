const express = require("express");
const db = require("../db");

const router = express.Router();

// GET all products (excluding soft deleted)
router.get("/", (req, res) => {
  const query = "SELECT * FROM products WHERE deleted_at IS NULL";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST add product
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const query = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(query, [name, price], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added", id: result.insertId });
  });
});

// PUT update product
router.put("/:id", (req, res) => {
  const { name, price } = req.body;
  const query = "UPDATE products SET name=?, price=? WHERE id=?";
  db.query(query, [name, price, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
});

// DELETE soft delete
router.delete("/:id", (req, res) => {
  const query = "UPDATE products SET deleted_at = NOW() WHERE id=?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product soft deleted" });
  });
});

// RESTORE product
router.put("/restore/:id", (req, res) => {
  const query = "UPDATE products SET deleted_at = NULL WHERE id=?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product restored" });
  });
});

module.exports = router;
