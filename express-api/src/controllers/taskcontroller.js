const Task = require('../models/task');

const getTasks = async (req, res) => {
    try {
        const { status, sortby = 'createdAt', order = 'desc' } = req.query;
        
        const query = { User: req.user._id };
        if (status&&['pending', 'in-progress', 'completed'].includes(status)){
            query.status = status;
        }

        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObject = {};
        sortObject[sortby] = sortOrder;

        const tasks = await Task.find(query).sort(sortObject);

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.'
            });
        }

        if (task.User.toString() !== req.user._id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task.'
            });
        }   
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }  
};
const createTask = async (req, res, next) => {
    try {
        const { title, Description, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required.'
            });
        }

        const task = await Task.create({
            User: req.user._id,
            title,
            Description,
            status: status || 'pending',
            dueDate
        });
        res.status(201).json({
            success: true,
            message: 'Task created successfully.',
            data: task
        });
    } catch (error) {
        next(error);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.'
            });
        }
        if (task.User.toString() !== req.user._id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task.'
            });
        }
        const { title, Description, status, dueDate } = req.body;

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, Description, status, dueDate },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Task updated successfully.',
            data: task
        });
    } catch (error) {
        next(error);
    }   
};
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false, 
                message: 'Task not found.'
            });
        }
        if (task.User.toString() !== req.user._id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task.'
            });
        }
        await task.remove();

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};

const getTaskStats = async (req, res, next) => {
    try {
        const totalTasks = await Task.countDocuments({ User: req.user._id });
        const pendingTasks = await Task.countDocuments({ User: req.user._id, status: 'pending' });
        const inProgressTasks = await Task.countDocuments({ User: req.user._id, status: 'in-progress' });
        const completedTasks = await Task.countDocuments({ User: req.user._id, status: 'completed' });  
        
        const now = new Date();
        const overdueTasks = await Task.countDocuments({ 
            User: req.user._id,
            dueDate: { $lt: now },
            status: { $ne: 'completed' }
        });

        res.status(200).json({
            success: true,
            data: {
                totalTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                overdueTasks
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
};