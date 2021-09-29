const button = document.getElementById("request-button");
const div = document.getElementById("display-container");

button.onclick = () => getList();

async function getList() {
    const response = await fetch("http://localhost:3000/api/groupMembers")
    .catch(e => {
        console.log("Unfortunately, there was an error.", e);
    })
    .then(data => {
        console.log(data.json());
    })
}