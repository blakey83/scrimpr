const puppeteer = require("puppeteer");

const commandLineScrape = async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);

    let products = [];

    await page.goto("https://www.woolworths.com.au/shop/search/products?searchTerm=milk", {
        headless: true,
        waitUntil: "networkidle2",
    });

    await page.evaluate(() => {
        //const productNodes = document.querySelectorAll("div[class='shelfProductTile-information']");
        const productNodes = document.getElementsByClassName("shelfProductTile-information");
        let productsOnPage = [];

        for (let j = 0; j < productNodes.length; j++) {
            const productObj = {
                item: productNodes[j].getElementsByClassName("sr-only")[0].innerText,
                price: productNodes[j].getElementsByClassName("price-dollars")[0].innerText.concat(
                    "." + productNodes[j].getElementsByClassName("price-cents")[0].innerText
                ),
            }

            productsOnPage.push(productObj);
        }

        return productsOnPage;
    }).then(data => {
        for (let product in data) {
            products.push(data[product]);
        }
    });

    console.log(products);

    await browser.close();
};

// Uncomment this to immediately invoke
(async () => {
    await commandLineScrape();
})();

// export {
//     commandLineScrape,
// }