const Router = require('koa-router');
const { createUser, login, checkLogin } = require('../controllers/indexController');

const auth = new Router();

    auth
        .post('/register', createUser)                  //register user
        .post('/login',login)                           //login user
        .get('/checkLogin', checkLogin);                //checking if tonken is



module.exports = auth;
