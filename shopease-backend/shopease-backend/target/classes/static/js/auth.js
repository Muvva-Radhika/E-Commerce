document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Login API is not implemented yet.");
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password = document.getElementById("password").value;
            const confirmPassword =
                document.getElementById("confirm-password").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            alert("Registration API is not implemented yet.");
        });
    }

});