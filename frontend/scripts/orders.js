const API_SUPPLIERS = "http://localhost:3000/suppliers";
const API_ITEMS = "http://localhost:3000/items";
const API_ORDERS = "http://localhost:3000/orders";

let orderItems = []; // temporary list of items for current order


// Load Suppliers into dropdown
function loadSuppliers() {
  fetch(API_SUPPLIERS)
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(s => {
        html += `<option value="${s.id}">${s.supplier_name}</option>`;
      });
      supplier_id.innerHTML = html;
    });
}


// Load Items into dropdown
function loadItems() {
  fetch(API_ITEMS)
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(i => {
        html += `<option value="${i.id}">${i.name}</option>`;
      });
      item_id.innerHTML = html;
    });
}


// Display items in the order items table
function renderOrderItems() {
  let rows = "";
  orderItems.forEach(it => {
    rows += `
      <tr>
        <td>${it.item_name}</td>
        <td>${it.quantity}</td>
        <td>${it.cost}</td>
      </tr>`;
  });
  document.getElementById("orderItemsTable").innerHTML = rows;
}


// Add item to temporary list
document.getElementById("addItemBtn").addEventListener("click", e => {
  e.preventDefault();

  const itemName = item_id.options[item_id.selectedIndex].text;

  const newItem = {
    item_id: item_id.value,
    item_name: itemName,
    quantity: quantity.value,
    cost: cost.value
  };

  orderItems.push(newItem);
  renderOrderItems();
});


// Submit order to backend
document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();

  const order = {
    supplier_id: supplier_id.value,
    order_date: order_date.value,
    status: status.value,
    total_amount: orderItems.reduce((sum, it) => sum + Number(it.cost), 0),
    items: orderItems
  };

  fetch(API_ORDERS, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(order)
  })
  .then(() => {
    alert("Order created successfully!");
    orderItems = [];
    renderOrderItems();
    loadOrders();
  });
});


// Load all orders
function loadOrders() {
  fetch(API_ORDERS)
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(o => {
        rows += `
          <tr>
            <td>${o.id}</td>
            <td>${o.supplier_id}</td>
            <td>${o.order_date}</td>
            <td>${o.status}</td>
            <td>${o.total_amount}</td>
          </tr>`;
      });
      document.getElementById("ordersTable").innerHTML = rows;
    });
}


// Initialize page
loadSuppliers();
loadItems();
loadOrders();
