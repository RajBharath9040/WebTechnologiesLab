const form = document.getElementById("regForm");
const role = document.getElementById("role");
const skills = document.getElementById("skills");

// Show or hide skills field
role.addEventListener("change", () => {
    if (role.value === "teacher" || role.value === "admin") {
        skills.classList.remove("hidden");
    } else {
        skills.classList.add("hidden");
        skills.value = "";
    }
});

// Email domain validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


// Password validation based on role
function validatePassword(password, role) {
    if (role === "student") {
        return password.length >= 6;
    }
    if (role === "teacher") {
        return password.length >= 8;
    }
    if (role === "admin") {
        return /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /\d/.test(password) &&
               /[@$!%*?&]/.test(password) &&
               password.length >= 10;
    }
    return false;
}

// Show error
function showError(input, message, errorId) {
    document.getElementById(errorId).innerText = message;
    input.classList.add("invalid");
}

// Clear error
function clearError(input, errorId) {
    document.getElementById(errorId).innerText = "";
    input.classList.remove("invalid");
}

// Form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const age = document.getElementById("age");

    // Name
    if (name.value === "") {
        showError(name, "Name is required", "nameError");
        valid = false;
    } else clearError(name, "nameError");

    // Email
    if (!validateEmail(email.value)) {
        showError(email, "Invalid email domain", "emailError");
        valid = false;
    } else clearError(email, "emailError");

    // Password
    if (!validatePassword(password.value, role.value)) {
        showError(password, "Weak password for selected role", "passwordError");
        valid = false;
    } else clearError(password, "passwordError");

    // Confirm password
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match", "confirmError");
        valid = false;
    } else clearError(confirmPassword, "confirmError");

    // Age
    if (age.value < 18) {
        showError(age, "Age must be 18 or above", "ageError");
        valid = false;
    } else clearError(age, "ageError");

    // Role
    if (role.value === "") {
        document.getElementById("roleError").innerText = "Role is required";
        valid = false;
    } else document.getElementById("roleError").innerText = "";

    // Skills
    if ((role.value === "teacher" || role.value === "admin") && skills.value === "") {
        showError(skills, "Skills required for this role", "skillsError");
        valid = false;
    } else clearError(skills, "skillsError");

    if (valid) {
        alert("Registration Successful!");
        form.reset();
        skills.classList.add("hidden");
    }
});
