let products = JSON.parse(localStorage.getItem("products")) || [];

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDescription = document.getElementById("productDescription");
let searchInput = document.getElementById("searchInput");
let tableBody = document.getElementById("tableBody");
let addBtn = document.getElementById("addBtn");

let currentIndex = -1;

displayData();


// ==========================
// Add / Update Button
// ==========================

addBtn.addEventListener("click", function () {

    if (currentIndex === -1) {
        addProduct();
    }
    else {
        updateProduct();
    }

});


// ==========================
// Clear Form
// ==========================

function clearForm() {

    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";

}


// ==========================
// Validation
// ==========================

function validateForm() {

    let name = productName.value.trim();
    let price = productPrice.value.trim();
    let description = productDescription.value.trim();

    if (name === "") {
        alert("Please enter product name");
        productName.focus();
        return false;
    }

    if (price === "") {
        alert("Please enter product price");
        productPrice.focus();
        return false;
    }

    if (isNaN(price)) {
        alert("Price must be a number");
        productPrice.focus();
        return false;
    }

    if (Number(price) <= 0) {
        alert("Price must be greater than 0");
        productPrice.focus();
        return false;
    }

    if (description === "") {
        alert("Please enter product description");
        productDescription.focus();
        return false;
    }

    return true;
}


// ==========================
// Clear All
// ==========================

function clearAll() {

    if (products.length === 0) {
        alert("There are no products to delete");
        return;
    }

    let confirmDelete = confirm(
        "Are you sure you want to delete ALL products?"
    );

    if (!confirmDelete) {
        return;
    }

    products = [];

    localStorage.removeItem("products");

    currentIndex = -1;

    addBtn.innerHTML = "Add Product";

    clearForm();

    displayData();

    alert("All products have been deleted");

}


// ==========================
// Add Product
// ==========================

function addProduct() {

    if (!validateForm()) {
        return;
    }

    let product = {

        id: Date.now(),

        name: productName.value.trim(),

        price: Number(productPrice.value),

        description: productDescription.value.trim()

    };

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayData();

    clearForm();

    alert("Product added successfully");

}


// ==========================
// Display Products
// ==========================

function displayData() {

    let tr = "";

    for (let i = 0; i < products.length; i++) {

        tr += `
        <tr>

            <td>${products[i].id}</td>

            <td>${products[i].name}</td>

            <td>${products[i].price}</td>

            <td>${products[i].description}</td>

            <td>

                <button
                    class="btn btn-primary"
                    onclick="editProduct(${products[i].id})">
                    Edit
                </button>

                <button
                    class="btn btn-primary"
                    onclick="deleteProduct(${products[i].id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    }

    tableBody.innerHTML = tr;

}


// ==========================
// Delete Product
// ==========================

function deleteProduct(id) {

    let product = products.find(function (product) {
        return product.id === id;
    });

    if (!product) {
        alert("Product not found");
        return;
    }

    let confirmDelete = confirm(
        `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmDelete) {
        return;
    }

    products = products.filter(function (product) {
        return product.id !== id;
    });

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayData();

    alert("Product deleted successfully");

}


// ==========================
// Edit Product
// ==========================

function editProduct(id) {

    for (let i = 0; i < products.length; i++) {

        if (products[i].id === id) {

            productName.value = products[i].name;

            productPrice.value = products[i].price;

            productDescription.value = products[i].description;

            currentIndex = i;

            addBtn.innerHTML = "Update Product";

            break;
        }
    }

}


// ==========================
// Update Product
// ==========================

function updateProduct() {

    if (!validateForm()) {
        return;
    }

    products[currentIndex].name =
        productName.value.trim();

    products[currentIndex].price =
        Number(productPrice.value);

    products[currentIndex].description =
        productDescription.value.trim();

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    currentIndex = -1;

    addBtn.innerHTML = "Add Product";

    clearForm();

    displayData();

    alert("Product updated successfully");

}


// ==========================
// Search
// ==========================

function searchProduct() {

    let searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue === "") {
        displayData();
        return;
    }

    let p = [];

    for (let i = 0; i < products.length; i++) {

        if (
            products[i].name
                .toLowerCase()
                .includes(searchValue)
        ) {

            p.push(products[i]);

        }

    }

    if (p.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Product Not Found
                </td>
            </tr>
        `;

        return;
    }

    let tr = "";

    for (let i = 0; i < p.length; i++) {

        tr += `
        <tr>

            <td>${p[i].id}</td>

            <td>${p[i].name}</td>

            <td>${p[i].price}</td>

            <td>${p[i].description}</td>

            <td>

                <button
                    class="btn btn-primary"
                    onclick="editProduct(${p[i].id})">
                    Edit
                </button>

                <button
                    class="btn btn-primary"
                    onclick="deleteProduct(${p[i].id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    }

    tableBody.innerHTML = tr;

}