const express = require("express");
const router = express.Router();
const db = require("../db");

// Create order
router.post("/", (req, res) => {
  const { supplier_id, order_date, status, total_amount, items } = req.body;

  // Insert order
  db.query(
    "INSERT INTO orders (supplier_id, order_date, status, total_amount) VALUES (?,?,?,?)",
    [supplier_id, order_date, status, total_amount],
    (err, result) => {
      const orderId = result.insertId;

      // Insert order items
      items.forEach(it => {
        db.query(
          "INSERT INTO order_items (order_id, item_id, quantity, cost) VALUES (?,?,?,?)",
          [orderId, it.item_id, it.quantity, it.cost]
        );
      });

      res.json({ message: "Order created" });
    }
  );
});

module.exports = router;
