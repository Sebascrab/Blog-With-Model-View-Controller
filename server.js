


const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const express = require('express');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers')
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3002;


// setting up sessions and secret:
const session = {
    secret: 'Sebascrab',
    cookie: {},
    resave: false,
    saveUninitiated: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(session));



// using handlebars: 
const hbs = exbhbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// middleware for parsing JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


// starting port
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
