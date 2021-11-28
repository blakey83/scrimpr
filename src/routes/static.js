import express from 'express';

// use middleware to serve static files
export function registerStaticRoutes(app) {

    // conditionally load env-specific assets
    const isProduction = process.env.NODE_ENV === 'production';
    app.use('/env.js', express.static(`src/assets/js/${isProduction ? 'env.prod.js' : 'env.js'}`));

    app.use('/favicon.ico', express.static('src/assets/images/favicon.ico'));

    app.use('/css', express.static('src/assets/css'));
    app.use('/js', express.static('src/assets/js'));
    app.use('/files', express.static('src/assets/files'));
    app.use('/images', express.static('src/assets/images'));
    app.use('/fonts', express.static('src/assets/fonts'));
    app.use('/assetsold', express.static('src/assets/assetsold'));
}
