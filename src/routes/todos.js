const Router = require('koa-router');
const { listTodo, createTodo, deleteTodo, updateTodo } = require('../controllers/indexController');

const todos = new Router();

    todos
        .get('/:user',  listTodo)                       //get all todos for user
        .post('/:user', createTodo)                     //create todo
        .delete('/:id', deleteTodo)                     //delete todo
        .patch('/:id', updateTodo)                      //update todo


module.exports = todos;
