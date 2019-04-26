const { combineRouters } = require('../utils');
const root = require('./root');
const auth = require('./auth');
const todos = require('./todos');
const routes = combineRouters([root, auth, todos]);

module.exports = routes;
