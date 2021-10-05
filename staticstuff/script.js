const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");
const loginButton = document.getElementById("login-button");

loginButton.onclick = () => attemptLogin();

// PLACEHOLDER - UNFINISHED
async function attemptLogin() {
    const username = usernameField.value;
    const password = passwordField.value;

    const body = { "username": username, "password": password };

    usernameField.value = "";
    passwordField.value = "";

    const response = await fetch("http://scrimpr.com/api/login", {
        "method": "POST",
        "body": JSON.stringify(body),
        "Content-Type": "application/json"
    }).then(data => {
        return data.json();
    });

    if (response.body.status === "success") {
        console.log(`User ${body.username} has successfully logged in!`);
    }
}

