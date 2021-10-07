
async function addUser(form) {
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
