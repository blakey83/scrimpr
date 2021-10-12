const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");

let searchTerm = "";

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("What would you like to search for?\n> ", input => {
    console.log(`Searching for ${input}...`);
    searchTerm = input.replace(/\s/g, "%20");
    readline.close();

    scraper(searchTerm);
});

async function scraper(searchTerm) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://shop.coles.com.au/a/national/everything/search/${searchTerm}`);
    const numPages = await page.evaluate(() => {
        return document.querySelector(".pagination").getElementsByTagName("li").length;
    }).then(result => result);
    console.log("Detected " + numPages + " pages!");

    let products = [];

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 3,
        puppeteerOptions: {
            headless: true,
        }
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);

        await page.evaluate(() => {
            const productNodes = document.querySelectorAll("div[class='product-main-info']");
            let productsOnPage = [];
    
            for (let j = 0; j < productNodes.length; j++) {
                const productObj = {
                    item: productNodes[j].querySelector("span[class='product-brand']").innerText + " " +
                        productNodes[j].querySelector("span[class='product-name']").innerText,
                    price: productNodes[j].querySelector("span[class='dollar-value']").innerText.concat(
                        productNodes[j].querySelector("span[class='cent-value']").innerText
                    ),
                }
    
                productsOnPage.push(productObj);
            }
    
            return productsOnPage;
        }).then(data => {
            products.push(data);
        });
    });

    for (let i = 1; i <= numPages; i++) {
        cluster.queue(`https://shop.coles.com.au/a/national/everything/search/${searchTerm}?pageNumber=${i}`);
    };

    await cluster.idle();
    await cluster.close();

    console.log(products);

    await browser.close();
}


