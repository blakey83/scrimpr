const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);

    await page.goto("https://www.woolworths.com.au/shop/search/products?searchTerm=milk");

    console.log(await page.content());

    await browser.close();
})();