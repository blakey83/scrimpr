async function pressTheButton(form) {
    try {
        const validate = await validatePassword(form);
        const user = await addUser(form);
        const respone = await saveUser(user);
        const response = await userPage(user);
        console.log("Done");    
    }
    catch (e){
        console.error(e);
        error.innerHTML = e
    }  
}

function validatePassword(form) {
    password = form.password.value;
    passwordrepeat = form.passwordrepeat.value;
    terms = form.termscheck.checked;
    if (password !== passwordrepeat){
        throw 'Passwords do not match'
    }
    else if (terms !== true) {
        throw 'You must agree to the terms and conditions to continue'
    }
    
}

function addUser(form) {
    return new Promise ((resolve, reject) => {
        const user = { 
            firstName: form.firstName.value, 
            lastName: form.lastName.value,
            postcode: form.postcode.value,
            email: form.email.value,
            password: form.password.value
        }
     resolve (user);
    });
}

function saveUser(user) {
    return new Promise ((resolve, reject) => {
        console.log(user)
        fetch('/users', {
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
        resolve (window.location.replace('./'));
    })
}