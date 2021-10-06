async function attemptLogin() {
    const username = usernameField.value;
    const password = passwordField.value;

    // const body = { "username": username, "password": password };

    // usernameField.value = "";
    // passwordField.value = "";
}
    async function addUser() {
        const firstname = document.getElementsByName("first-name");
        const lastname = document.getElementsByName("last-name");
        const postcode = document.getElementsByName("postcode");
        const Email = document.getElementsByName("email");
        const password = document.getElementsByName('password');
        console.log(firstname);
        const object = { 
            firstname: firstname.value, 
            lastname: lastname.value,
            postcode: postcode.value,
            Email: Email.value,
            password: password.value
         };
         console.log(object);
        const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
        });
    }
