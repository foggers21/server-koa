const Router = require('koa-router');
const KoaBody = require('koa-body');
const { listTodo, createTodo, deleteTodo, updateTodo, checkLogin, logout} = require('../controllers/indexController');

const { register ,authEmail, generateToken, isAuthenticated } =  require('../auth');


const User = require('../models/user.model');



const router = new Router();

    router
        .get('/todos/:user',  listTodo)              //get all todos for user
        .post('/todos/:user', KoaBody(), createTodo) //create todo
        .delete('/todos/:id', deleteTodo)            //delete todo
        .patch('/todos/:id',  KoaBody(), updateTodo) //update todo
    //    .post('/checkLogin',  KoaBody(), checkLogin) //check login
    //    .post('/login',       KoaBody(), login)      //login
    //    .post('/register',    KoaBody(),register)    //registration
        .post('/logout',      logout)               //logout

        .post('/checkLoginEmail',  authEmail(), generateToken()) 
        .post('/auth/register', register, generateToken()) //register
      //  .get('/checkLoginJwt', isAuthenticated(), async ctx => { // Get user data from server using token
      //      const user = await User.findById(ctx.state.user);
      //      if (user) ctx.body = user;
      //    });

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};        
