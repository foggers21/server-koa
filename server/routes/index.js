const Router = require('koa-router');
const KoaBody = require('koa-body');
const { listTodo, createTodo, deleteTodo, updateTodo, createUser, login, checkLogin } = require('../controllers/indexController');



const router = new Router();

    router
        .get('/todos/:user',  listTodo)                 //get all todos for user
        .post('/todos/:user', KoaBody(),createTodo)     //create todo
        .delete('/todos/:id', deleteTodo)               //delete todo
        .patch('/todos/:id',  KoaBody(), updateTodo)    //update todo
        .get('/', ctx => {
            ctx.body = "Welcome on server for todo-app";
        })

        //auth requests
        .post('/register', createUser)                  //register user
        .post('/login',login)                           //login user
        .get('/checkLogin', checkLogin);                //checking if tonken is



module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};        
