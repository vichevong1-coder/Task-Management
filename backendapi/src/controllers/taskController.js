const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo } = req.body;
        const task = new Task({
            title,
            description,
            dueDate,
            //help to assign task to logged in user
            assignedTo: req.user._id,
        });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'username email');
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Update a task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }   
};
// Delete a task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
