const storeController = require('../controllers/store.controller');

module.exports = (app) => {
    app.get('/api/store/products', storeController.getAllProducts);
};