// 3rd-party dependencies
import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { registerRoutes } from './routes/index.js';
import * as auth from './utils/auth.js';

// Load environment variables from .env
config();

// Connect to DB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Set up express router
const app = express();
app.use(cors()); // disable cors
app.use(json()); // enable JSON request body support
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Pug to render HTML 
app.set('view engine', 'pug');
app.set('views', './src/views');

// Use session information to keep the user logged in
app.use(session ({
    secret: 'very secret 1234',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI })
}));

// So the app uses authorization to do it's thing
app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

registerRoutes(app);

// Start HTTP listener
const port = Number(process.env.PORT || 80);;
app.listen(port, () => console.log(`Listening on port ${port}...`));