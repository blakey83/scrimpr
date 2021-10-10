const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);
    await page.goto("https://shop.coles.com.au/a/national/everything/search/milk");

    let content = await page.content();
    fs.writeFile("content.html", content, "utf8", (e) => {
        if (err) throw err;
        console.log("A file was created: content.html");
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


