import { Router } from 'express';

import { scraper } from "../utils/scrapers/coles/scraper.js";

const router = Router();

router.get("/:searchTerm", async (req, res) => {
    const products = await scraper(req.params.searchTerm);
    res.send(products);
});

export {
    router,
}