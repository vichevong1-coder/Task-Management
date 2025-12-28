const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
} = require('../controllers/taskcontroller');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);
router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/stats').get(getTaskStats);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;