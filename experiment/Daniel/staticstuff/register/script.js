


async function pressTheButton(form) {
    try {
        const validate = await validatePassword(form);
        const user = await addUser(form);
        const respone = await saveUser(user);
        const forward = await userPage(user);
        console.log("Done");    
    }
    catch (e){
        console.error(e);
    }
    
}

function validatePassword(form) {
    password = form.password.value;
    passwordrepeat = form.passwordrepeat.value;
    if (password !== passwordrepeat){
        throw 'Passwords do not match'
    }
    
}

function addUser(form) {
    return new Promise ((resolve, reject) => {
        const user = { 
            firstname: form.firstname.value, 
            lastname: form.lastname.value,
            postcode: form.postcode.value,
            Email: form.email.value,
            password: form.password.value
        }
     resolve (user);
    });
}

function saveUser(user) {
    return new Promise ((resolve, reject) => {
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            
        })
        .then(setTimeout(() => {
            resolve(fetch)
        }), 2000)
        .catch(e => {
            console.log("Error", e);
        })
    })
}
    
function userPage(user){
    return new Promise ((resolve, reject) => {
        console.log(user);
        resolve (window.location.replace('../index.html'));       
    })
}