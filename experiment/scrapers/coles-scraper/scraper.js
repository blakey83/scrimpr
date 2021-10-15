const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");

function scraper() {
    let searchTerm = "";

    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.question("What would you like to search for?\n> ", input => {
        console.log(`Searching Coles catalogue for ${input}...`);
        searchTerm = input.replace(/\s/g, "%20");
        readline.close();

        scraper(searchTerm);
    });

    async function scraper(searchTerm) {
        let numPages = 1;
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

            if (url.slice(-2) === "=1") {
                let num = await page.evaluate(() => {
                    if (document.querySelector(".pagination") === null) {
                        return 1;
                    } else {
                        return document.querySelector(".pagination").getElementsByTagName("li").length;
                    }
                }).then(result => result);
                console.log("Detected " + num + " pages!");
                numPages = num;
            }

            await page.evaluate(() => {
                const productNodes = document.querySelectorAll(".product-main-info");
                let productsOnPage = [];
        
                for (let j = 0; j < productNodes.length; j++) {
                    let brandName = productNodes[j].querySelector(".product-brand") ?? "ERROR";
                    let productName = productNodes[j].querySelector(".product-name") ?? "ERROR";
                    let dollars = productNodes[j].querySelector(".dollar-value") ?? "ERROR";
                    let cents = productNodes[j].querySelector(".cent-value") ?? "ERROR";

                    if (brandName != "ERROR") brandName = brandName.innerText;
                    if (productName != "ERROR") productName = productName.innerText;
                    if (dollars != "ERROR") dollars = dollars.innerText;
                    if (cents != "ERROR") cents = cents.innerText;

                    const productObj = {
                        item: brandName + " " + productName,
                        price: dollars.concat(cents),
                    }
        
                    productsOnPage.push(productObj);
                }
        
                return productsOnPage;
            }).then(data => {
                for (let i in data) {
                    products.push(data[i]);
                }
            });
        });

        try {
            for (let i = 1; i <= numPages; i++) {
                await cluster.execute(`https://shop.coles.com.au/a/national/everything/search/${searchTerm}?pageNumber=${i}`);
            };
        } catch (err) {
            console.log("ERROR:", err);
        }
        

        await cluster.idle();
        await cluster.close();

        for (let i in products) {
            console.log(products[i]);
        }
        console.log("\nFinished scrape, collected " + products.length + " items.");
    }
}

module.exports = scraper;