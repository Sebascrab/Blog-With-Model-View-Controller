




const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection')
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret: 'secret secrets are no fun', 
    cookie: {
        expires: 5 * 60 * 1000

    },

    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }), 

};


// session:
app.use(session(sess));

// middleware for parsing json;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// connecting public folder:
app.use(express.static(path.join(__dirname, 'public')));


// using handlebars as engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

// connecting for display in local server: 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening...'));
})

