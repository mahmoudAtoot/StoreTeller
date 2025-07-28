const shopController = require('../controllers/shop.controller');

module.exports = (app) => {
    app.get('/api/shops', shopController.getAllShops);
};