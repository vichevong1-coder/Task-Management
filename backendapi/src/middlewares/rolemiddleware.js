const User = require('../models/User');

const checkRole = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!requiredRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};

module.exports = { checkRole };