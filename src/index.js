const Koa = require('koa');

const app = new Koa();
const routes = require('./routes');
const err = require('./helpers/error');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { PORT } = process.env;
const { setUpConnection } = require('./utils/dataBaseUtils');
setUpConnection();
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

app.use(err);
app.use(helmet());
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize());
app.use(routes);


app.listen(PORT, () => {
  console.log(`started on port: ${PORT}`);
});
