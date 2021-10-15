const scraper = require("../../scrapers/coles-scraper/scraper");
const express = require("express");
const app = express();

app.get("/api/products/:searchTerm", async (req, res) => {
    const products = await scraper(req.params.searchTerm);
    res.send(products);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));