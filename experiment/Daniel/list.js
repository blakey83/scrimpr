const groceries = document.getElementsByClassName
    ("shopping-list")[0];
const pig = document.getElementById("pig");
const allItems = document.getElementById("allItems");
const userInput = document.getElementById("userInput");

let itemNumber = 0;

pig.addEventListener("click", function () {
    allItems.innerHTML = "";
    itemNumber = 0;
})

userInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter")
        addItem();
})

function addItem() {

    itemNumber++;

    var h3 = document.createElement("h3");
    h3.innerHTML = itemNumber + ". " + userInput.value;

    h3.addEventListener("click", function () {
        h3.style.textDecoration = "line-through";
    })

    allItems.insertAdjacentElement("beforeend", h3);

    userInput.value = " ";
}