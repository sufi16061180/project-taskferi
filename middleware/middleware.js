const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config');

const {bindUserWithRequest} = require('./authMiddleware');
const setLocals = require('./setLocals');

const dbURI= `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@taskferi.0bhgc.mongodb.net/taskferi_user`;

const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions',
    expires: 60 * 60 * 1000 * 2
});



const middleware=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
    

]

module.exports = app =>{
    middleware.forEach(m=>{

        app.use(m);
    });
}