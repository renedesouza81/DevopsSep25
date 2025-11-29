document.getElementById("stockForm").addEventListener("submit", e => {
  e.preventDefault();

  fetch("http://localhost:3000/stock", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      item_id: item_id.value,
      quantity: quantity.value,
      change_type: change_type.value,
      user_id: user_id.value
    })
  })
  .then(() => alert("Stock updated"));
});
