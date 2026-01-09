const express = require('express');
const routes = express.Router();
const { signup, login, profile } = require('../controllers/authController');
const { protect } = require('../middlewares/authmiddleware');
const { checkRole } = require('../middlewares/rolemiddleware');

routes.post('/signup', signup);
routes.post('/login', login);
routes.get('/profile', protect, profile);

routes.get('/admin', protect, checkRole(['admin']), (req, res) => {
    res.send('Admin Login Successful');
});

module.exports = routes;