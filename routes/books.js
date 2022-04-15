const express = require('express');
const authByToken = require('../middlewares/auth');

const route = express.Router();

const controllers = require('../controllers/controllers');


route.post('/search', authByToken, controllers.record_query)
route.post('/login', controllers.login);

module.exports = route;