const express = require('express');

const scraper = require("../../experiment/scrapers/coles-scraper/scraper");

const router = express.Router();

router.get("/:searchTerm", async (req, res) => {
    const products = await scraper(req.params.searchTerm);
    res.send(products);
});

module.exports = router;