const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
  const query = "SELECT * FROM products WHERE deleted_at IS NULL";

  db.query(query, (err, results) => {
    if (err) {
      console.error("FETCH ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
    res.json(results);
  });
});



router.post("/", (req, res) => {
  const { name, price } = req.body;

  console.log("ADD PRODUCT BODY:", req.body);

  if (!name || price === undefined) {
    return res
      .status(400)
      .json({ message: "Product name and price are required" });
  }

  const query =
    "INSERT INTO products (name, price, deleted_at) VALUES (?, ?, NULL)";

  db.query(query, [name, Number(price)], (err, result) => {
    if (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({
        message: "Failed to add product",
        error: err,
      });
    }

    res.status(201).json({
      message: "Product added successfully",
      id: result.insertId,
    });
  });
});



router.put("/:id", (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  if (!name || price === undefined) {
    return res
      .status(400)
      .json({ message: "Product name and price are required" });
  }

  const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";

  db.query(query, [name, Number(price), id], (err) => {
    if (err) {
      console.error("UPDATE ERROR:", err);
      return res.status(500).json({ message: "Failed to update product" });
    }

    res.json({ message: "Product updated successfully" });
  });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "UPDATE products SET deleted_at = NOW() WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({ message: "Failed to delete product" });
    }

    res.json({ message: "Product soft deleted successfully" });
  });
});



router.put("/restore/:id", (req, res) => {
  const { id } = req.params;

  const query = "UPDATE products SET deleted_at = NULL WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("RESTORE ERROR:", err);
      return res.status(500).json({ message: "Failed to restore product" });
    }

    res.json({ message: "Product restored successfully" });
  });
});

module.exports = router;
