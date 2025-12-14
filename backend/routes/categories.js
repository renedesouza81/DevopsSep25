const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { category_name, description } = req.body;

  db.query(
    "INSERT INTO categories (category_name, description) VALUES (?,?)",
    [category_name, description],
    (err) => {
      if (err) throw err;
      res.json({ message: "Category added" });
    }
  );
});

module.exports = router;
