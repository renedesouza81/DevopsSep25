const API = "http://localhost:3000/categories";

function loadCategories() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(c => rows += `<tr><td>${c.id}</td><td>${c.category_name}</td></tr>`);
      document.getElementById("categoryTable").innerHTML = rows;
    });
}

document.getElementById("addCategoryForm").addEventListener("submit", e => {
  e.preventDefault();

  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      category_name: category_name.value,
      description: description.value
    })
  })
  .then(() => loadCategories());
});

loadCategories();
