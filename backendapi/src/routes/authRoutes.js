const express = require('express');
const routes = express.Router();
const { signup, login, profile } = require('../controllers/authController');
const { protect } = require('../middlewares/authmiddleware');

routes.post('/signup', signup);
routes.post('/login', login);
routes.get('/profile', protect, profile);

module.exports = routes;