const express = require("express");
const router = express.Router();
const db = require("../db");

// Stock in/out
router.post("/", (req, res) => {
  const { item_id, quantity, change_type, user_id } = req.body;

  // 1. Insert transaction log
  db.query(
    "INSERT INTO stock_transactions (item_id, quantity, change_type, created_by) VALUES (?,?,?,?)",
    [item_id, quantity, change_type, user_id]
  );

  // 2. Update item quantity
  const operation = change_type === "IN" ? "+" : "-";
  db.query(
    `UPDATE items SET quantity = quantity ${operation} ? WHERE id=?`,
    [quantity, item_id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Stock updated" });
    }
  );
});

module.exports = router;
