module.exports = {
    getAllProducts: (req, res) => {
        res.json([ { id: 1, name: 'Sample Product 1', price: 10.99 }, { id: 2, name: 'Sample Product 2', price: 20.00 } ]);
    },
};