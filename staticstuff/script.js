
const loginButton = document.getElementById("login-button");
const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");
loginButton.onclick = () => attemptLogin(usernameField, passwordField);

async function attemptLogin(usernameField, passwordField) {
    try {
        const details = await getDetails(usernameField,);
        const data = await searchUsers(searchValue);
        const user = await parseData(data);
        const credentials = await credGet(user);
        const varify = await credCheck(varification, passwordField)
        const forward = await userPage(user);
 
    }
    catch (e){
        console.error(e);
    }  
}


function getDetails(usernameField, passwordField) {
    return new Promise ((resolve, reject) => {
        const username = usernameField.value;        
        searchValue = 'http://scrimpr.com/api/users/'+ username;
        resolve (searchValue)
    });
}

function searchUsers(searchValue) {
    return new Promise ((resolve, reject) => {
        console.log(searchValue);
        try{
            const test = fetch(searchValue)
            .then(function (response){
                resolve(response.json());
        })
    }
        catch(e){
            console.log('no such account is found');
        }
    })
}
function parseData(data) {
    return new Promise ((resolve, reject) =>{
        rawData = JSON.stringify(data[0]);
        user = JSON.parse(rawData);
        console.log(user)
        resolve(user)
    })
}
 function credGet(user) {
     return new Promise((resolve, reject) =>{
        varification = user.password;
        resolve(varification)
     })
 }
 function credCheck(varification, passwordField) {
        const password = passwordField.value;
        console.log(password, varification)
        if(password !== varification) {
            throw 'Password is not correct'
        }
 }
 function userPage(user){
    return new Promise ((resolve, reject) => {
        console.log(user);
        resolve (window.location.replace('./userpage/userPage.html'));       
    })
}