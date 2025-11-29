const API_URL = "http://localhost:3000/items";

// Fetch and display items
function loadItems() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tableBody = document.querySelector("#itemTable tbody");
            tableBody.innerHTML = "";

            data.forEach(item => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                    </tr>
                `;
            });
        });
}

// Add item
document.getElementById("addForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const item = {
        name: document.getElementById("name").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    })
    .then(() => loadItems());
});

// Load items on start
loadItems();
