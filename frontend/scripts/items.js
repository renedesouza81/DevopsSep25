const API = "/api/items";

function loadItems() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(i => {
        rows += `
          <tr>
            <td>${i.id}</td><td>${i.name}</td><td>${i.category_id}</td>
            <td>${i.quantity}</td><td>${i.price}</td>
          </tr>`;
      });
      document.getElementById("itemsTable").innerHTML = rows;
    });
}

document.getElementById("addItemForm").addEventListener("submit", e => {
  e.preventDefault();

  const item = {
    name: name.value,
    category_id: category_id.value,
    quantity: quantity.value,
    price: price.value,
  };

  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
  .then(() => loadItems());
});

loadItems();
