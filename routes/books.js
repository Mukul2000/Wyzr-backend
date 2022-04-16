const express = require('express');
const authByToken = require('../middlewares/auth');

const route = express.Router();

const controllers = require('../controllers/controllers');


route.get('/search', authByToken, controllers.search_query);
route.get('/book/:id', authByToken, controllers.book_detail);
route.post('/login', controllers.login);

module.exports = route;