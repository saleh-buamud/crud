// ==========================
// API CONFIG
// ==========================

const url = "https://jsonplaceholder.typicode.com/posts";


// ==========================
// STATE
// ==========================

let posts = [];
let editId = null;

let currentPage = 1;
const postsPerPage = 10;
let pendingDeleteId = null;
let toastTimer = null;


// ==========================
// DOM ELEMENTS
// ==========================

const postsTableBody = document.getElementById("postsTableBody");
const userIdInput = document.getElementById("userId");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

const submitBtn = document.getElementById("submitBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formMode = document.getElementById("formMode");
const postsCount = document.getElementById("postsCount");
const pageIndicator = document.getElementById("pageIndicator");
const emptyState = document.getElementById("emptyState");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const validationFields = [userIdInput, titleInput, bodyInput];


// ==========================
// GET - Fetch Posts
// ==========================

async function getPosts() {

    postsTableBody.innerHTML = `
        <tr class="loading-row">
            <td colspan="4">
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                Loading posts...
            </td>
        </tr>
    `;

    try {

        const response = await axios.get(url);

        // Store the data returned by the API.
        posts = response.data;

        // Render the data.
        displayData();

    } catch (error) {

        console.log("Error fetching posts:", error);

    }
}


// ==========================
// DISPLAY DATA
// ==========================

function displayData() {

    postsTableBody.innerHTML = "";
    postsCount.textContent = `${posts.length} ${posts.length === 1 ? "Post" : "Posts"}`;

    const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const currentPosts = posts.slice(start, end);

    emptyState.classList.toggle("is-hidden", posts.length !== 0);

    for (let i = 0; i < currentPosts.length; i++) {

        const post = currentPosts[i];

        postsTableBody.innerHTML += `
            <tr>

                <td>${post.id}</td>

                <td>${post.userId}</td>

                <td>${post.title}</td>

                <td>${post.body}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editPost(${post.id})">
                        <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                        <span>Edit</span>
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePost(${post.id})">
                        <i class="fa-solid fa-trash" aria-hidden="true"></i>
                        <span>Delete</span>
                    </button>

                </td>

            </tr>
        `;
    }

    updatePaginationButtons();
}


// ==========================
// PAGINATION
// ==========================

function nextPage() {

    const totalPages = Math.ceil(
        posts.length / postsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        displayData();
    }
}


function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        displayData();
    }
}


function updatePaginationButtons() {

    const totalPages = Math.ceil(
        posts.length / postsPerPage
    );

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    postsCount.textContent = `${posts.length} ${posts.length === 1 ? "Post" : "Posts"}`;
    pageIndicator.textContent = `Page ${Math.max(1, currentPage)} of ${Math.max(1, totalPages)}`;
}


prevBtn.addEventListener("click", previousPage);

nextBtn.addEventListener("click", nextPage);

cancelBtn.addEventListener("click", function () {

    clearForm();
});

cancelDeleteBtn.addEventListener("click", function () {

    closeDeleteModal();
});

confirmDeleteBtn.addEventListener("click", function () {

    const id = pendingDeleteId;

    closeDeleteModal();

    if (id !== null) {

        executeDelete(id);
    }
});


// ==========================
// ADD / UPDATE BUTTON
// ==========================

submitBtn.addEventListener("click", function (event) {

    event.preventDefault();

    if (!validateForm()) {

        return;
    }

    if (editId === null) {

        addPost();

    } else {

        updatePost(editId);

    }

});


// ==========================
// FORM VALIDATION
// ==========================

function validateField(input) {

    const value = input.value.trim();
    let message = "";

    if (input.id === "userId") {

        if (value === "") {

            message = "User ID is required.";

        } else if (!Number.isFinite(Number(value)) || Number(value) <= 0) {

            message = "User ID must be a positive number.";
        }
    }

    if (input.id === "title") {

        if (value === "") {

            message = "Title is required.";

        } else if (value.length < 3) {

            message = "Title must contain at least 3 characters.";
        }
    }

    if (input.id === "body") {

        if (value === "") {

            message = "Body is required.";

        } else if (value.length < 5) {

            message = "Body must contain at least 5 characters.";
        }
    }

    const errorElement = document.getElementById(
        input.getAttribute("aria-describedby")
    );
    const validationIcon = input.parentElement.querySelector(
        ".validation-icon"
    );

    input.classList.toggle("is-valid", message === "");
    input.classList.toggle("is-invalid", message !== "");

    errorElement.textContent = message;

    validationIcon.className = message === ""
        ? "fa-solid fa-circle-check validation-icon"
        : "fa-solid fa-circle-exclamation validation-icon";

    validationIcon.classList.add("is-visible");
    validationIcon.classList.toggle("is-error", message !== "");

    return message === "";
}


function validateForm() {

    const validationResults = validationFields.map(validateField);
    const firstInvalidField = validationFields.find(function (input, index) {

        return !validationResults[index];

    });

    if (firstInvalidField) {

        firstInvalidField.focus();

        return false;
    }

    return true;
}


function showToast(message) {

    toastMessage.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

        toast.classList.remove("is-visible");
    }, 3500);
}


function closeDeleteModal() {

    deleteModal.classList.add("is-hidden");
    pendingDeleteId = null;
}


function resetValidationState(input) {

    const errorElement = document.getElementById(
        input.getAttribute("aria-describedby")
    );
    const validationIcon = input.parentElement.querySelector(
        ".validation-icon"
    );

    input.classList.remove("is-valid", "is-invalid");
    errorElement.textContent = "";
    validationIcon.className = "validation-icon";
}


validationFields.forEach(function (input) {

    input.addEventListener("input", function () {

        validateField(input);
    });

    input.addEventListener("blur", function () {

        validateField(input);
    });
});


// ==========================
// ADD POST
// ==========================

async function addPost() {

    const userId = Number(userIdInput.value);
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    const post = {

        userId: userId,
        title: title,
        body: body

    };

    try {

        const response = await axios.post(url, post);

        console.log("Post added:", response.data);

        /*
            JSONPlaceholder does not persist data
            on the server.

            Add the new data to the local array
            so it appears in the interface.
        */

        posts.push(response.data);

        currentPage = Math.ceil(
            posts.length / postsPerPage
        );

        displayData();

        clearForm();

        showToast("Post added successfully.");

    } catch (error) {

        console.log("Error adding post:", error);

    }
}


// ==========================
// EDIT POST
// ==========================

function editPost(id) {

    const post = posts.find(function (post) {

        return post.id === id;

    });

    if (!post) {

        console.log("Post not found");

        return;
    }

    userIdInput.value = post.userId;

    titleInput.value = post.title;

    bodyInput.value = post.body;

    editId = id;

    submitBtn.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i><span>Update Post</span>';
    cancelBtn.classList.remove("is-hidden");
    formMode.textContent = "Editing post";

    validateForm();
}


// ==========================
// UPDATE POST
// ==========================

async function updatePost(id) {

    const post = {

        userId: Number(userIdInput.value),

        title: titleInput.value.trim(),

        body: bodyInput.value.trim()

    };

    try {

        const response = await axios.put(
            `${url}/${id}`,
            post
        );

        console.log("Post updated:", response.data);

        /*
            The API returned the updated post.
            Update the local array now.
        */

        const index = posts.findIndex(function (post) {

            return post.id === id;

        });

        if (index !== -1) {

            posts[index] = response.data;

        }

        editId = null;

        submitBtn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i><span>Add Post</span>';

        clearForm();

        displayData();

        showToast("Post updated successfully.");

    } catch (error) {

        console.log("Error updating post:", error);

    }
}


// ==========================
// DELETE POST
// ==========================

async function deletePost(id) {

    pendingDeleteId = id;
    deleteModal.classList.remove("is-hidden");
}


async function executeDelete(id) {

    try {

        const response = await axios.delete(
            `${url}/${id}`
        );

        console.log("Post deleted:", response);

        /*
            Because JSONPlaceholder does not actually
            delete data from a real database, remove it
            from the local array as well.
        */

        posts = posts.filter(function (post) {

            return post.id !== id;

        });

        const totalPages = Math.ceil(
            posts.length / postsPerPage
        );

        if (
            currentPage > totalPages &&
            totalPages > 0
        ) {

            currentPage = totalPages;

        }

        if (posts.length === 0) {

            currentPage = 1;

        }

        displayData();

        showToast("Post deleted successfully.");

    } catch (error) {

        console.log("Error deleting post:", error);

    }
}


// ==========================
// SORT
// ==========================

function sortPosts() {

    const sortValue =
        document.getElementById("sortSelect").value;

    if (sortValue === "title-asc") {

        posts.sort(function (a, b) {

            return a.title.localeCompare(b.title);

        });

    }

    else if (sortValue === "title-desc") {

        posts.sort(function (a, b) {

            return b.title.localeCompare(a.title);

        });

    }

    currentPage = 1;

    displayData();
}


// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    userIdInput.value = "";

    titleInput.value = "";

    bodyInput.value = "";

    editId = null;

    submitBtn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i><span>Add Post</span>';
    cancelBtn.classList.add("is-hidden");
    formMode.textContent = "New post";

    validationFields.forEach(resetValidationState);
}


// ==========================
// START APPLICATION
// ==========================

getPosts();






function searchPost() {

    let searchValue = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    if (searchValue === "") {
        displayData();
        return;
    }

    let filteredPosts = [];

    for (let i = 0; i < posts.length; i++) {

        if (
            posts[i].title.toLowerCase().includes(searchValue)) {

            filteredPosts.push(posts[i]);

        }
    }

    if (filteredPosts.length === 0) {

        document.getElementById("postsTableBody").innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center;">
                    Post Not Found
                </td>
            </tr>
        `;

        return;
    }

    let tr = "";

    for (let i = 0; i < filteredPosts.length; i++) {

        tr += `
            <tr>

                <td>${filteredPosts[i].userId}</td>

                <td>${filteredPosts[i].title}</td>

                <td>${filteredPosts[i].body}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editPost(${filteredPosts[i].id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePost(${filteredPosts[i].id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    }

    document.getElementById("postsTableBody").innerHTML = tr;
}