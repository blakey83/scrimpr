// store page elements in variables
const button = document.getElementById("get-button");
const div = document.getElementById("display-container");

// define a function for the button's onclick behaviour
button.onclick = () => getList();

// make an asynchronous function by prefixing "async" - this is
// important when using fetch(), although you don't necessarily
// need to understand why at this stage
async function getList() {
    // create a variable and make your fetch call. be sure to prefix it
    // with "await". when the response arrives, it will become the value
    // of this variable
    const response = await fetch("http://scrimpr.com/api/groupMembers", {
            // when calling fetch(), the first parameter is the endpoint (URL) to
            // send the request to. the optional second parameter is an object
            // containing headers - the Access-Control-Allow-Origin one shown 
            // below is important
        "Access-Control-Allow-Origin": "*"
    }) // fetch().then() <---- then() is a function that you define for when the
       // fetch process finally returns with a response, in order to tell it what
       // you would like to do next. use this generic pattern to return the server's
       // response into the value of our "response" variable
    .then(data => {
        return data.json();
    })

    // now that we know our response variable contains the response from the server,
    // we can display it on the webpage. be sure to use JSON stringify to turn the
    // raw JSON into a normal string
    div.innerText = "RESPONSE:\n" + JSON.stringify(response);
}
