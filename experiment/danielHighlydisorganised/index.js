const mongoose = require('mongoose');
const Joi = require('joi');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require ('connect-mongo')(session);
//const groupMembers = require('./routes/groupMembers');
const users = require('./routes/users');
const auth = require('./lib/auth');
const app = express();
var cors = require('cors')

//Connect to the mongoDB in the sky
mongoose.connect('mongodb+srv://Scrimpr_App:z20Nx3ifk9vUDzBh@cluster0.otxks.mongodb.net/ScrimprApp')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => {
        console.error('could not connect to MongoDB', err)    
    });

//Use Pug to render HTML 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'))


//use middleware to serve static files
app.use('/static', express.static('views/assets'));
app.use('/css', express.static('views/assets/css'));
app.use('/js', express.static('views/assets/js'));
app.use('/files', express.static('views/assets/files'));
app.use('/images', express.static('views/assets/images'));
app.use('/fonts', express.static('views/assets/fonts'));

//Use routes to find routing information
app.use('/', routes());
    

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

//Use session information to keep the user logged in
app.use(session ({
    secret: 'very secret 1234',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection })
}));

//So the app uses authorization to do it's thing
app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);


//app.use('/api/groupMembers', groupMembers);
app.use('/users', users);
//port 80 yo!!
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));