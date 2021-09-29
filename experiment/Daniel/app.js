// store page elements in variables
const button = document.getElementById("get-button");
const div = document.getElementById("display-container");



// define a function for the button's onclick behaviour
button.onclick = () => getList();


// make an asynchronous function by prefixing "async" - this is
// important when using fetch(), although you don't necessarily
// need to understand why at this stage
async function getList() {
    const response = await fetch("http://localhost:3000/api/groupMembers", {
        "Access-Control-Allow-Origin": "*"})
    .then(data => {
        return data.json()
    })
    div.innerText = "";
    for(i=0; i<response.length; i++) {
        let rawData = JSON.stringify(response[i])
        let teamMember = JSON.parse(rawData)
        div.innerText +=teamMember.id+".  "+ teamMember.name+" is on team "+ teamMember.team+"\n";
        console.log(teamMember.name);
    };
    
   
}
//New function that posts what we put into the boxes
async function poststuff() {
    const name = document.getElementById("name");
    const team = document.getElementById("team");
    const object = { name:name.value, team: team.value };
    const response = await fetch('http://localhost:3000/api/groupMembers', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
        'Content-Type': 'application/json'
    }
    });
getList();
}