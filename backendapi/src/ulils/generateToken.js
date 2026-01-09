const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, Processing.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

module.exports = generateToken;