const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/auth/register', authController.registerUser);
    app.post('/api/auth/login', authController.loginUser);
};
