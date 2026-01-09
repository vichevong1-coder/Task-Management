const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../ulils/generateToken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user', //default role to user 
        });

        const token = generateToken(user._id);

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user && await bcrypt.compare(password, user.password)) {
            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        }        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { 
    signup,
    login,              
};
