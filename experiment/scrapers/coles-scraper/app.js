const scraper = require("./scraper.js");

async function commandLineScrape() {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.question("What would you like to search for?\n> ", input => {
        console.log(`Searching Coles catalogue for ${input}...`);
        readline.close();

        scraper(input);
    });
}

commandLineScrape();