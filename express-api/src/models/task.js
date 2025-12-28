const mongoose = require('mongoose');
const User = require('./User');

const TaskSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    Description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'  
    },
    dueDate: {
        type: Date  
    }
},
    {
    timestamps: true 
    }
);

TaskSchema.index({ User: 1, status: 1 });
TaskSchema.index({ User: 1, dueDate: 1 });

module.exports = mongoose.model('Task', TaskSchema);