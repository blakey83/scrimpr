
const button = document.getElementById("get-button");
const div = document.getElementById("display-container");

button.onclick = () => getList();

async function getList() {
    const response = await fetch("http://scrimpr.com/api/groupMembers", {
        "Access-Control-Allow-Origin": "*"})
    .then(data => {
        return data.json()
    })
    div.innerText = "";
    for(i=0; i<response.length; i++) {
        let rawData = JSON.stringify(response[i])
        let teamMember = JSON.parse(rawData)
        div.innerText +=teamMember.name+" is on team "+ teamMember.team+"\n";
        console.log(teamMember.name);
    };
    
   
}
//New function that posts what we put into the boxes
async function poststuff() {
    const name = document.getElementById("name");
    const team = document.getElementById("team");
    const object = { name:name.value, team: team.value };
    const response = await fetch('http://scrimpr.com/api/groupMembers', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
        'Content-Type': 'application/json'
    }
    })
}

// Search functionalitiy
async function searchTeam() {
    const tname = document.getElementById("searchName");
    const name = document.getElementById("name");
    const searchValue = "http://scrimpr.com/api/groupmembers/" + (tname.value);
    const respond = await fetch(searchValue)
    .then(data => {
        return data.json()
    })
    rawData = JSON.stringify(respond[0]);
    person = JSON.parse(rawData);
    console.log(person);
    if (person.name !== "Erin") { 
        div.innerText = "You're looking for "+person.name+" who works in the "+person.team+" department, and reports to Erin!";
    }
    else if (person.name === "Erin"){
        div.innerText = "Erin is the boss !"
    }
}