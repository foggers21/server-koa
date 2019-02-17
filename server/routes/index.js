const Router = require('koa-router');
const KoaBody = require('koa-body');
const { listTodo, createTodo, deleteTodo, updateTodo, checkLogin, login, register, logout} = require('../controllers/indexController');



const router = new Router();

    router
        .get('/todos/:user',  listTodo)              //get all todos for user
        .post('/todos/:user', KoaBody(), createTodo) //create todo
        .delete('/todos/:id', deleteTodo)            //delete todo
        .patch('/todos/:id',  KoaBody(), updateTodo) //update todo
        .post('/checkLogin',  KoaBody(), checkLogin) //check login
        .post('/login',       KoaBody(), login)      //login
        .post('/register',    KoaBody(),register)    //registration
        .post('/logout',      logout);               //logout


module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};        
