import { scraper } from "./scraper.js";
import { createInterface } from 'readline';

async function commandLineScrape() {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.question("What would you like to search for?\n> ", input => {
        console.log(`Searching Coles catalogue for ${input}...`);
        readline.close();

        scraper(input);
    });
}

// Uncomment this to immediately invoke
(async () => {
    await commandLineScrape();
})();

// export {
//     commandLineScrape,
// }