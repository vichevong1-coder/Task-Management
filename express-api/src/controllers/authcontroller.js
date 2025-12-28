const User = require('../models/User');
const {generateToken} = require('../utils/jwt');

const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields.'});
        }

        const user = await User.create({username, email, password});

        const token = generateToken({id: user._id});

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email   
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
}   
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password.'
            });
        }
        const user = await User.findOne({email}).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully.',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }   
};
const getMe = async (req, res, next) => {
    try {
        const user = req.user;  
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }   catch (error) {
        next(error);
    }
};

module.exports = { register, login, getMe };