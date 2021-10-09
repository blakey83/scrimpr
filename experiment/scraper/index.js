const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--disable-extensions-except=/path/to/manifest/folder/',
            '--load-extension=/path/to/manifest/folder/',
        ]
    });
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);
    await page.goto("https://shop.coles.com.au/a/national/everything/search/milk");

    let content = await page.content();
    fs.writeFile("content.html", content, "utf8", (e) => {
        //console.log("Error when writing file:", e);
    });

    await page.goto(`file:${  path.join(__dirname, "content.html")  }`);

    await page.evaluate(() => {
        return document.querySelectorAll(".product-name");
    }).then(data => {
        console.log(data);
        console.log("Reached then then() block.");
    });

    await browser.close();
})();


