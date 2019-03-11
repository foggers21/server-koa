const Koa = require('koa');
const { serverPort } = require('../config');
const err = require('./helpers/error');
const {routes, allowedMethods}  = require('./routes');
const app = new Koa();
const logger = require('koa-logger');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');


const port = 3000 || process.env.PORT;


const { setUpConnection } = require('./utils/dataBaseUtils');
setUpConnection();
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

app.use(err);
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize());
app.use(routes());
app.use(allowedMethods());



app.listen(port,() => {
    console.log(`Server started on port: ${port}`);
});