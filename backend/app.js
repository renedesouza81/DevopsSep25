const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// =======================
// SERVE FRONTEND FILES
// =======================
app.use(express.static(path.join(__dirname, '../frontend')));

// =======================
// BACKEND API (WITH PREFIX /api)
// =======================

const itemsRouter = require('./routes/items');
const categoriesRouter = require('./routes/categories');
const suppliersRouter = require('./routes/suppliers');
const stockRouter = require('./routes/stock');
const ordersRouter = require('./routes/orders');

app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/stock', stockRouter);
app.use('/api/orders', ordersRouter);

// =======================
// START SERVER (PORT 3000)
// =======================
app.listen(3000, () => {
  console.log("Frontend + Backend API running on http://localhost:3000");
});
