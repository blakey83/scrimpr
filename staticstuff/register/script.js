


async function pressTheButton(form) {
    try {
        const user = await addUser(form);
        const respone = await saveUser(user);
        const forward = await userPage(user);
        console.log("Done");    
    }
    catch (err){
        console.log('Error', err.message);
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
        fetch('http://scrimpr.com/api/users', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            
        })
        .next (resolve(fetch))
        .catch(e => {
            console.log("Error", e);
        })
    })
}
    
function userPage(user){
    return new Promise ((resolve, reject) => {
        console.log(user);
        resolve (window.location.replace("http://scrimpr.com/api/users"));
     })
}