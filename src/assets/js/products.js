console.log('window.API_URL', window.API_URL);
async function searchProducts() {
    const searchTerm = document.getElementById("searchTerm");
    const searchValue = `${window.API_URL}/products/${searchTerm.value}`;

    setProductListLoadingState();
    const products = await (await fetch(searchValue)).json();
    populateProductsList(products);
}

const getProductsListEl = () => document.getElementById('products-list');

function clearProductsList() {
    const list = getProductsListEl();
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function setProductListLoadingState() {
    clearProductsList();
    const list = getProductsListEl();
    const item = document.createElement("li");
    item.appendChild(document.createTextNode("Loading.."));
    list.appendChild(item);
}

function populateProductsList(Products) {
    clearProductsList();
    const list = getProductsListEl();
    for (const product of Products) {
        const item = document.createElement("li");
        item.appendChild(document.createTextNode(`${product.item} - $${product.price}`));
        list.appendChild(item);
    }
}