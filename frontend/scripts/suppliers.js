const API = "http://localhost:3000/suppliers";

function loadSuppliers() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(s => rows += `<tr><td>${s.id}</td><td>${s.supplier_name}</td><td>${s.contact}</td></tr>`);
      document.getElementById("supplierTable").innerHTML = rows;
    });
}

document.getElementById("addSupplierForm").addEventListener("submit", e => {
  e.preventDefault();

  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      supplier_name: supplier_name.value,
      contact: contact.value,
      email: email.value,
      address: address.value
    })
  })
  .then(() => loadSuppliers());
});

loadSuppliers();
