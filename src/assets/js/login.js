async function loginAttempt(form) {
    const credentials = {
        email: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
}
try {
    await fetch('./login', {    
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    window.location.replace('./home');
}
catch {
    console.log('Error', e);
}
    }


