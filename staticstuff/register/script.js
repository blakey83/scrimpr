



// async function attemptLogin() {
//     const username = usernameField.value;
//     const password = passwordField.value;

//     // const body = { "username": username, "password": password };

//     // usernameField.value = "";
//     // passwordField.value = "";
// }


async function addUser(form) {
    // const firstname = form.firstname.value;
    // const lastname = form.lastname.value;
    // const postcode = form.postcode.value;
    // const Email = form.email.value;
    // const password = form.password.value;
    const object = { 
        firstname: form.firstname.value, 
        lastname: form.lastname.value,
        postcode: form.postcode.value,
        Email: form.email.value,
        password: form.password.value
     };
     console.log(object);
    const response = await fetch('http://scrimpr.com/api/users', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
        'Content-Type': 'application/json'
    }
    });
 }
