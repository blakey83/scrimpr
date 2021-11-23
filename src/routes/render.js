import { Router } from 'express';
import passport from 'passport';
import { scraper } from '../utils/scrapers/coles/scraper.js';

import { User } from '../models/user.js';

const router = Router();

/**
 * The routes in the file are intended to be queried directly, and render a page result (HTML)
 * 
 * (i.e. not API endpoints)
 */

router.get('/', async (req, res) => {
  return res.render('index'), { success: req.query.success };
});

router.get('/favourites', (_, res) => void res.render('favourites'));
router.get('/home', (_, res) => void res.render('home'));
router.get('/list', (_, res) => void res.render('list'));
router.get('/mylists', (_, res) => void res.render('mylists'));
router.get('/products', (_, res) => void res.render('products'));
router.get('/register', (_, res) => void res.render('register'));
router.get('/results', async function(req, res) {
  res.render('results', { data: await scraper(req.query.search ?? "groceries") } );
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '../?error=true',
}));

router.post('/users', async (req, res, next) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      postcode: req.body.postcode,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    return next();
  } catch (e) {
    console.error(e);
  }
});

export {
  router,
}