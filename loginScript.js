const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
    console.log(usernameField.value);
    console.log(passwordField.value);
})