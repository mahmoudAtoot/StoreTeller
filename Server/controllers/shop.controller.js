const Shop = require('../models/shop.model');

module.exports = {
    getAllShops: (req, res) => {
        Shop.find()
            .then((shops) => {
                res.json(shops);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
};