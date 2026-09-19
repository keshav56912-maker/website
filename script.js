const API_URL =
    "https://crudcrud.com/api/2445cf5338c74b9693aef41be1f73d74/users";

const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const submitBtn = document.getElementById("submitBtn");


// CREATE / UPDATE
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const user = {
        username: username,
        email: email,
        phone: phone
    };

    const editId = form.dataset.editId;


    // UPDATE
    if (editId) {

        await fetch(`${API_URL}/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        });

        delete form.dataset.editId;

        submitBtn.textContent = "Add User";

    }

    // CREATE
    else {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        });
    }


    form.reset();

    getUsers();
});


// READ
async function getUsers() {

    const response = await fetch(API_URL);

    const users = await response.json();

    displayUsers(users);
}


// DISPLAY USERS
function displayUsers(users) {

    userList.innerHTML = "";

    users.forEach(function(user) {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${user.username}</strong>
            <br>
            ${user.email}
            <br>
            ${user.phone}
            <br>

            <button onclick="editUser('${user._id}')">
                Edit
            </button>

            <button onclick="deleteUser('${user._id}')">
                Delete
            </button>
        `;

        userList.appendChild(li);
    });
}


// EDIT
async function editUser(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const user = await response.json();

    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;

    form.dataset.editId = id;

    submitBtn.textContent = "Update User";
}


// DELETE
async function deleteUser(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"
    });

    getUsers();
}


// LOAD USERS
getUsers();
