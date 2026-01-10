const express = require('express');
const routes = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authmiddleware');

routes.post('/create', protect, createTask);
routes.get('/get', protect, getTasks);
routes.put('/update/:id', protect, updateTask);
routes.delete('/delete/:id', protect, deleteTask);

module.exports = routes;