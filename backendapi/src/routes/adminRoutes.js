const express = require('express');
const routes = express.Router();
const { getAllUsers, getAllTasks, deleteUser, getStats } = require('../controllers/adminController');
const { protect } = require('../middlewares/authmiddleware');
const { checkRole } = require('../middlewares/rolemiddleware');


routes.get('/users', protect, checkRole(['admin']), getAllUsers);
routes.delete('/user/:id', protect, checkRole(['admin']), deleteUser);
routes.get('/stats', protect, checkRole(['admin']), getStats);
routes.get('/tasks', protect, checkRole(['admin']), getAllTasks);

module.exports = routes;