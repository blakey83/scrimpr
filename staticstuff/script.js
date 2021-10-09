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

    async function addUser() {
        const firstname = document.getElementById("first-name");
        const lastname = document.getElementById("last-name");
        const postcode = document.getElementById("postcode");
        const Email = document.getElementById("email");
        const password = document.getElementById(password);
        const object = { 
            firstname: firstname.value, 
            lastname: team.value,
            postcode: postcode.value,
            Email: Email.value,
            password: password.value,
         };
        const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
        });
    }
}
    

//     if (response.body.status === "success") {
//         console.log(`User ${body.username} has successfully logged in!`);
//     }
// }

