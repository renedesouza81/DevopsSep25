const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/items", require("./routes/items"));
app.use("/categories", require("./routes/categories"));
app.use("/suppliers", require("./routes/suppliers"));
app.use("/stock", require("./routes/stock"));
app.use("/orders", require("./routes/orders"));

app.listen(3000, () => console.log("API running at http://localhost:3000"));