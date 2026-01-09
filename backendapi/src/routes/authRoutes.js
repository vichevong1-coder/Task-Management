const express = require('express');
const routes = express.Router();
const { protect } = require('../middlewares/authmiddleware');

routes.post('/signup', Signup);
routes.post('/login', Login);

module.exports = routes;