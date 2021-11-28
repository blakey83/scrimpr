import { Cluster } from "puppeteer-cluster";

async function scraper(searchTerm) {
    searchTerm = searchTerm.replace(/\s/g, "%20");
    let numPages = 1;
    let products = [];

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 3,
        puppeteerOptions: {
            args: ["--no-sandbox"],
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
            let productNodes = document.querySelectorAll(".product");
            let productsOnPage = [];

            for (let j = 0; j < productNodes.length; j++) {
                let brand = productNodes[j].querySelector(".product-brand");
                let product = productNodes[j].querySelector(".product-name");
                let dollars = productNodes[j].querySelector(".dollar-value");
                let cents = productNodes[j].querySelector(".cent-value");
                let imgURL = productNodes[j].querySelector(".product-image");

                if (brand == null | product == null | dollars == null | cents == null | imgURL == null) {
                    continue;
                } else {
                    brand = brand.innerText;
                    product = product.innerText;
                    dollars = dollars.innerText;
                    cents = cents.innerText;
                    imgURL = imgURL.getElementsByTagName("img")[0].src;
                }

                const productObj = {
                    item: brand + " " + product,
                    price: dollars.concat(cents),
                    img: imgURL,
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

    function generatePrice(price) {
        const percent = (Math.random() * 0.21).toFixed(3);
        const diff = price * percent;
        const coinFlip = Math.round(Math.random());

        let result = 0.00;

        if (coinFlip) {
          result = price + diff;
        } else {
          result = price - diff;
        }

        return parseFloat(result).toFixed(2);
    }

    for (let i in products) {
        if (products[i].item.indexOf("Coles ") === -1) {
            products[i].wooliesPrice = generatePrice(products[i].price); 
        } else {
            products[i].wooliesPrice = null;
        }

        console.log(products[i]) 
    };
    console.log("\nFinished scrape, collected " + products.length + " items.");
    return products;
}

export {
    scraper,
}