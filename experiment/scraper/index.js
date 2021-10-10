const puppeteer = require("puppeteer");

const searchTerm = "cordial";

async function scraper(searchTerm) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);

    await page.goto(`https://shop.coles.com.au/a/national/everything/search/${searchTerm}`);
    const pages = await page.evaluate(() => {
        return document.querySelector(".pagination").getElementsByTagName("li").length;
    }).then(result => result);
    console.log("Detected " + pages + " pages!");

    let products = [];

    for (let i = 1; i <= pages; i++) {
        await page.goto(`https://shop.coles.com.au/a/national/everything/search/${searchTerm}?pageNumber=${i}`);

        await page.evaluate(() => {
            const productNodes = document.querySelectorAll("div[class='product-main-info']");
            let productsOnPage = [];
    
            for (let j = 0; j < productNodes.length; j++) {
                const productObj = {
                    brand: productNodes[j].querySelector("span[class='product-brand']").innerText,
                    item: productNodes[j].querySelector("span[class='product-name']").innerText,
                    price: productNodes[j].querySelector("span[class='dollar-value']").innerText.concat(
                        productNodes[j].querySelector("span[class='cent-value']").innerText
                    ),
                }
    
                productsOnPage.push(productObj);
            }
    
            return productsOnPage;
        }).then(data => {
            for (let k = 0; k < data.length; k++) {
                products.push(data[k]);
            }
        });
    }

    console.log(products);

    await browser.close();
}

scraper(searchTerm);


