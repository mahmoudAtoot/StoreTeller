const authController = require('../controllers/auth.controller');
const jwtMiddleware = require('../middleware/jwt.middleware');

module.exports = (app) => {
    app.post('/api/auth/register', authController.registerUser);
    app.post('/api/auth/login', authController.loginUser);
    app.get('/api/me', jwtMiddleware.authenticate, authController.getLoggedInUser);
};
