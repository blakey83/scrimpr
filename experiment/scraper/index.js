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
    fs.writeFile("content.html", content, "utf8", (err) => {
        if (err) throw err;
        console.log("A file was created: content.html");
    });

    await page.goto(`file:${  path.join(__dirname, "content.html")  }`);

    await page.evaluate(() => {
        return document.querySelectorAll(".product");
    }).then(data => {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].innerText);
        }
    });

    await browser.close();
})();


