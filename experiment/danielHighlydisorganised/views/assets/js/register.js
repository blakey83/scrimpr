

function validatePassword(form) {
    try {
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
    catch (e){
        console.error(e);
        error.innerHTML = e
    }   
}


