const Router = require('koa-router');
const { listTodo, createTodo, deleteTodo, updateTodo, createUser, login, checkLogin } = require('../controllers/indexController');



const router = new Router();

    router
        .get('/todos',  listTodo)              //get all todos for user
        .post('/todos',createTodo) //create todo
        .delete('/todos/:id', deleteTodo)            //delete todo
        .patch('/todos/:id',  updateTodo) //update todo
        .get('/', ctx => {
            ctx.body = "Welcome on server for todo-app";
        })

        //auth requests
        .post('/register', createUser)//register user
        .post('/login',login)//login user
        .get('/checkLogin', checkLogin);//checking if tonek is



module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};        
