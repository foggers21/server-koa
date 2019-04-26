const Router = require('koa-router');

const root = new Router();

root.get('/', async (ctx) => {
  ctx.body = "Welcome on server for todo-app";
});

module.exports = root;
