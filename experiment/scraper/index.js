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
        console.log("Searching page for divs with class 'product-name'...");
        let results = document.querySelectorAll("span[class='product-name']");
        let array = [];
        for (let i = 0; i < results.length; i++) {
            array.push(results[i].innerText);
        }
        return array;
    }).then(data => {
        console.log("full data:", data);
        console.log("Looping over divs to print innerText:");
        for (let i = 0; i < data.length; i++) {
            console.log("Loop number", i);
            console.log(data[i]);
        }
    });

    await browser.close();
})();


