# Product Manager CRUD App

A simple, professional product management web application for adding, viewing, editing, searching, sorting, and deleting products. The app is built as a lightweight front-end project using HTML, CSS, and JavaScript, and it stores data locally in the browser using `localStorage`.

## Overview

This project provides a clean interface for managing a product catalog. Users can enter product details such as name, price, and description, and the application keeps the data available even after refreshing the page. It is designed for fast, browser-based CRUD operations without requiring a backend or database.

## Features

- Add new products with product name, price, and description
- View all products in a structured table
- Edit existing product entries
- Delete individual products
- Delete all products with confirmation
- Search products by name
- Sort by name or price in ascending or descending order
- Filter by minimum and maximum price
- Persistent data storage in the browser using `localStorage`
- Responsive, modern user interface with polished styling

## Technologies Used

- HTML5 for page structure
- CSS3 for layout, styling, and responsive design
- JavaScript (ES6+) for data handling and DOM updates
- Browser `localStorage` for persistence
- Event listeners for interactive user actions
- Dynamic rendering using JavaScript template strings and DOM manipulation

## How the CRUD System Works

The application follows the standard CRUD flow:

1. Create: The user enters a product name, price, and description, then clicks the add button. A new object is created and pushed into the product list.
2. Read: The product array is rendered into the table so all entries are visible on the page.
3. Update: When a user clicks Edit, the selected product values are loaded into the form. After updating the data, the changes are saved back to the array and re-rendered.
4. Delete: Each row includes a Delete button. The product is removed from the array after confirmation and the table is refreshed.
5. Delete All: A dedicated action clears the full list after confirmation.

## LocalStorage Usage

The app stores the product list in the browser’s `localStorage` under the key `products`.

- When the page loads, the app reads the saved data from `localStorage`.
- If no data exists, it initializes with a default sample list of products.
- After every add, update, or delete action, the updated product array is saved back to `localStorage`.
- This ensures that product data remains available after a browser refresh.

This approach is ideal for lightweight front-end applications where persistence is required without a backend.

## Search and Sorting Functionality

### Search
Users can type into the search field to find products quickly. The search typically filters the list by product name, allowing users to narrow results without manually scanning the entire catalog.

### Sorting
The sorting controls allow the user to reorder products by:

- Name: A to Z
- Name: Z to A
- Price: Lowest to Highest
- Price: Highest to Lowest

This is done by reordering the array before the table is rendered again.

## Add, Edit, Delete, and Delete-All

### Add Product
The form validates user input before saving. It checks that:

- the product name is not empty
- the price is provided and numeric
- the price is greater than zero
- the description is not empty

Once validated, the record is saved and displayed in the table.

### Edit Product
Selecting Edit loads the product details into the form for modification. Clicking the update action saves the new values and replaces the original product record.

### Delete Product
Each product includes a delete action. Before removing the item, the app asks for confirmation to prevent accidental deletion.

### Delete All
The delete-all option clears the entire catalog after a confirmation prompt. It also removes the stored data from `localStorage` so the browser state is reset.

## How to Run the Project

Because this is a static front-end project, you can run it in any of the following ways:

1. Open `crud.htm` directly in your browser.
2. Or run it with a local development server such as Live Server in VS Code.

### Recommended quick start

- Open the project folder in VS Code
- Right-click `crud.htm`
- Choose Open with Live Server, or simply open the file in a browser

## Project Structure

- `crud.htm` — main page layout
- `crud.css` — styling and responsive UI design
- `main.js` — application logic and CRUD behavior
- `README.md` — project documentation

## Summary

This project demonstrates a practical front-end CRUD workflow using JavaScript and browser storage. It is small, fast, and easy to understand, making it a strong example of how a simple product management system can be built without a backend.



# 🚀 JavaScript Learning Roadmap

> My progress while learning JavaScript and building practical projects.

## 📚 Learning Progress

| Topic | Status |
|---|---|
| 🟢 JavaScript Basics | ✅ Completed |
| 🟢 Arrays & Objects | ✅ Completed |
| 🟢 DOM | ✅ Completed |
| 🟢 Events | ✅ Completed |
| 🟢 CRUD | ✅ Completed |
| 🟢 Local Storage | ✅ Completed |
| 🟢 Search | ✅ Completed |
| 🟢 Sorting | ✅ Completed |
| 🟢 Filter | ✅ Completed |
| 🟡 Pagination | 🔄 In Progress |
| ⚪ Promises | ⬜ Not Started |
| ⚪ Async / Await | ⬜ Not Started |
| ⚪ Fetch API | ⬜ Not Started |
| ⚪ API CRUD | ⬜ Not Started |

---

## 🎯 Next Steps

```text
Pagination
    ↓
Promises
    ↓
Async / Await
    ↓
Fetch API
    ↓
API CRUD
    ↓
Real Projects
