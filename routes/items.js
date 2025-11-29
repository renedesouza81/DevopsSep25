const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all items
router.get("/", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add item
router.post("/", (req, res) => {
  const { name, category_id, quantity, price } = req.body;

  db.query(
    "INSERT INTO items (name, category_id, quantity, price) VALUES (?,?,?,?)",
    [name, category_id, quantity, price],
    (err) => {
      if (err) throw err;
      res.json({ message: "Item added!" });
    }
  );
});

// Update item
router.put("/:id", (req, res) => {
  const { name, category_id, quantity, price } = req.body;

  db.query(
    "UPDATE items SET name=?, category_id=?, quantity=?, price=? WHERE id=?",
    [name, category_id, quantity, price, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Item updated!" });
    }
  );
});

// Delete item
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM items WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Item deleted!" });
    }
  );
});

module.exports = router;
