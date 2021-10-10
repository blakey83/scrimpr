const products = document.querySelectorAll(".product");

for (let i = 0; i < products.length; i++) {
    console.log("Loop number", i + 0);
    console.log(products[i].innerText);
    console.log(products[i].querySelector(".product-name").innerText);
}