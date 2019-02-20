const Router = require('koa-router');
const KoaBody = require('koa-body');
const { listTodo, createTodo, deleteTodo, updateTodo, } = require('../controllers/indexController');



const router = new Router();

    router
        .get('/todos/',  listTodo)              //get all todos for user
        .post('/todos/', KoaBody(), createTodo) //create todo
        .delete('/todos/:id', deleteTodo)            //delete todo
        .patch('/todos/:id',  KoaBody(), updateTodo) //update todo



module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};        
