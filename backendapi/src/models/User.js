const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Task = require('./Task');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,   
})

// when delete a user thier task also get deleted
userSchema.pre('findByIdAndDelete', async function(next) {
    try {
        const userId = this.getFilter()._id;
        await Task.deleteMany({ assignedTo: userId });
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;  
