const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM suppliers", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { supplier_name, contact, email, address } = req.body;

  db.query(
    "INSERT INTO suppliers (supplier_name, contact, email, address) VALUES (?,?,?,?)",
    [supplier_name, contact, email, address],
    (err) => {
      if (err) throw err;
      res.json({ message: "Supplier added" });
    }
  );
});

module.exports = router;
