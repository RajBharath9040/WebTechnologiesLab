const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');

// 1. Initial Load
document.addEventListener('DOMContentLoaded', displayUsers);

// 2. Handle Registration
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const mobile = document.getElementById('userMobile').value;
    const pass = document.getElementById('userPass').value;

    // VALIDATIONS
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    if (pass.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // CHECK FOR DUPLICATE EMAIL
    const exists = users.some(u => u.email === email);
    if (exists) {
        alert("This email is already registered!");
        return;
    }

    // SAVE USER
    const newUser = { name, email, mobile, pass };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

// 3. Display Users in Table
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        `;
        userList.appendChild(row);
    });
}

// 4. Delete Single User
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// 5. Clear All Users
function clearAllUsers() {
    if (confirm("Are you sure you want to delete ALL users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
}