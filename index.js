const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const GoogleStrategy = require('./config/googleOauth2-strategy');
const passportLocal = require('./config/passport-local-strategy');

const db =require('./config/mongoose');

//saving the users information (don't need to login ) after server restart
const MongoStore = require('connect-mongo')(session);



app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(bodyParser.json());




app.use(session({
    name: 'userLogin',
    secret: 'keyboard',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },

    store : new MongoStore(
    {
        mongooseConnection : db,
        autoRemove : 'disabled'

    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(require('./middleware/flash'));

app.use(express.static('./assets'));
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes/index'));

app.listen(port,function(req,res){
    console.log(`The app is running on the port ${port}`);
});