function validateForm() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    var namePattern = /^[A-Za-z ]+$/;
    var phonePattern = /^[0-9]+$/;

    if (!name.match(namePattern)) {
        alert("Name must contain only alphabets");
        return false;
    }

    if (!phone.match(phonePattern)) {
        alert("Phone number must contain only digits (0-9)");
        return false;
    }

    alert("Form submitted successfully");
    return true;
}
