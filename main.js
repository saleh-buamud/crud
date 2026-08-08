let products = JSON.parse(localStorage.getItem("products")) || [
    {
        id: 1,
        name: "iPhone 15",
        price: 3500,
        description: "Apple smartphone with excellent performance"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 2800,
        description: "Powerful Android smartphone with great camera"
    },
    {
        id: 3,
        name: "MacBook Air M2",
        price: 4200,
        description: "Lightweight laptop with Apple M2 chip"
    },
    {
        id: 4,
        name: "iPad Pro 12.9",
        price: 3900,
        description: "Powerful tablet with a large Liquid Retina display"
    },
    {
        id: 5,
        name: "AirPods Pro 2",
        price: 850,
        description: "Wireless earbuds with active noise cancellation"
    },
    {
        id: 6,
        name: "Apple Watch Series 9",
        price: 1200,
        description: "Smartwatch with health and fitness tracking features"
    },
    {
        id: 7,
        name: "Dell XPS 15",
        price: 4800,
        description: "Premium laptop designed for productivity and performance"
    },
    {
        id: 8,
        name: "Lenovo ThinkPad X1",
        price: 4300,
        description: "Business laptop with excellent keyboard and performance"
    },
    {
        id: 9,
        name: "Sony WH-1000XM5",
        price: 1100,
        description: "Premium wireless headphones with noise cancellation"
    },
    {
        id: 10,
        name: "PlayStation 5",
        price: 2800,
        description: "Next-generation gaming console with high performance"
    },
    {
        id: 11,
        name: "Xbox Series X",
        price: 2500,
        description: "Powerful gaming console with fast loading times"
    },
    {
        id: 12,
        name: "Samsung 55-inch TV",
        price: 2200,
        description: "4K smart television with vivid picture quality"
    },
    {
        id: 13,
        name: "Logitech MX Master 3S",
        price: 450,
        description: "Advanced wireless mouse designed for productivity"
    },
    {
        id: 14,
        name: "Keychron K2",
        price: 380,
        description: "Compact mechanical wireless keyboard"
    },
    {
        id: 15,
        name: "Anker Power Bank",
        price: 250,
        description: "Portable power bank with fast charging support"
    }
];
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDescription = document.getElementById("productDescription");
let searchInput = document.getElementById("searchInput");
let tableBody = document.getElementById("tableBody");
let addBtn = document.getElementById("addBtn");

let currentIndex = -1;

displayData();
// sortProductprice()
sortProductname();

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
document.getElementById("price-asc").addEventListener("click", sortProductpriceAsc);
document.getElementById("price-desc").addEventListener("click", sortProductpriceDesc);
// document.getElementById("name-desc").addEventListener("click", sortProductname);


function sortProducts() {
    const sortValue = document.getElementById("sortSelect").value;

    if (sortValue === "name-asc") {
        sortProductnameAsc();

    } else if (sortValue === "name-desc") {
        sortProductnameDesc();

    } else if (sortValue === "price-asc") {
        sortProductpriceAsc();
    } else if (sortValue === "price-desc") {
        sortProductpriceDesc();
    }
    displayData();
}
function sortProductpriceAsc() {

    products.sort(function (a, b) {
        return a.price - b.price;
    });

}

function sortProductpriceDesc() {

    products.sort(function (a, b) {
        return b.price - a.price;
    });

}

function sortProductnameAsc() {

    products.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });

}
function sortProductnameDesc() {

    products.sort(function (a, b) {
        return b.name.localeCompare(a.name);
    });

}



function filterByPrice() {
    let filteredProducts = [];
    let minPrice = document.getElementById("minPrice").value.trim();
    let maxPrice = document.getElementById("maxPrice").value.trim();
    if (minPrice == '' && maxPrice === '') {
        filteredProducts = products;
        resulFillter(filteredProducts);
        return;
    }
    else if (minPrice === "") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].price <= maxPrice) {
                filteredProducts.push(products[i]);
            }
        }
        resulFillter(filteredProducts);
        return;
    }
    else if (maxPrice === "") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].price >= minPrice) {
                filteredProducts.push(products[i]);
            }
        }
        resulFillter(filteredProducts);
        return;
    }
    else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].price >= minPrice && products[i].price <= maxPrice) {
                filteredProducts.push(products[i]);
            }
        }

    }
    resulFillter(filteredProducts);
}

function resetFilter() {
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    displayData();
}

function resulFillter(filteredProducts) {
    tableBody.innerHTML = "";
    for (let i = 0; i < filteredProducts.length; i++) {
        tableBody.innerHTML += `
            <tr>
                <td>${filteredProducts[i].id}</td>
                <td>${filteredProducts[i].name}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].description}</td>
                <td>
                    <button class="btn btn-primary" onclick="editProduct(${filteredProducts[i].id})">Edit</button>
                    <button class="btn btn-primary" onclick="deleteProduct(${filteredProducts[i].id})">Delete</button>
                </td>
            </tr>
        `;
    }

}