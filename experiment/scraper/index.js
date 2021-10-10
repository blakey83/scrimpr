const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        //headless: false,
        //devtools: true,
    });
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);
    await page.goto("https://shop.coles.com.au/a/national/everything/search/milk");

    let content = await page.content();
    fs.writeFile("content.html", content, "utf8", (err) => {
        if (err) throw err;
        console.log("A file was created: content.html");
    });

    await page.goto(`file:${  path.join(__dirname, "content.html")  }`);

    await page.evaluate(() => {
        const productNodes = document.querySelectorAll("div[class='product-main-info']");
        let products = [];

        for (let i = 0; i < productNodes.length; i++) {
            const productObj = {
                brand: productNodes[i].querySelector("span[class='product-brand']").innerText,
                item: productNodes[i].querySelector("span[class='product-name']").innerText,
                price: productNodes[i].querySelector("span[class='dollar-value']").innerText.concat(
                    productNodes[i].querySelector("span[class='cent-value']").innerText
                ),
            }

            products.push(productObj);
        }

        return products;
    }).then(data => {
        console.log(data);
    });

    await browser.close();
})();


