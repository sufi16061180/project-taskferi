require('dotenv').config();
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const setMiddleware = require('./middleware/middleware');

const setRoutes = require('./routes/routes');

const { MongoClient, ServerApiVersion } = require('mongodb');

const dbURI= 'mongodb+srv://nuren1180:nuren1180@taskferi.0bhgc.mongodb.net/';


const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');


setMiddleware(app);

setRoutes(app);

app.use ((req, res, next)=>
{
    let error = new Error('404 Page Not Found')
    error.status=404
    next(error)
})

app.use((error, req, res, next)=>
{
    if(error.status===404)
    {
        return res.render('404')
    }

    console.log(error.message);
    console.log(error);

    res.render('500')

})

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen(process.env.PORT || 8080))
    .catch((e)=> console.log(e))


//const config = require('./config/config');
/*const morgan = require('morgan');*/
/*const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoute');*/
/*const session = require('express-session');*/
/*const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
*/


//console.log(config.prod.name);
//console.log(config.get('email'));




/*
const {bindUserWithRequest} = require('./middleware/authMiddleware');
const setLocals = require('./middleware/setLocals');

const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions',
    expires: 60 * 60 * 1000 * 2
});

*/



//console.log(app.get('env'));

/*
const middleware=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()


]
*/
/*
app.use(middleware);
*/


//app.use('/auth', authRoutes);
/*pp.use('/dashboard', dashboardRoutes);


app.get('/', (req, res)=>
{

    res.render('index', {title: 'Welcome to TaskFeri'});
});

*/

//app.use(authRoutes);
