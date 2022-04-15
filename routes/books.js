const express = require('express');
const route = express.Router();

const controllers = require('../controllers/controllers');


route.post('/search', controllers.record_query)
route.post('/login', controllers.login);

module.exports = route;