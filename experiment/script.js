let borderButton = document.getElementById("border-button")
let border = document.getElementById("logo")

let back = document.getElementById("middle")

document.querySelector("background-button").addEventListener("")
document.querySelector("toggle").addEventListener("")

let toggle = false;

function changeBackground() {
    let a = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let c = Math.floor(Math.random()*256);

    let colour = "rgb(" + a + "," +  b + "," + c + ")";

    document.body.style.background = colour;
}


    

