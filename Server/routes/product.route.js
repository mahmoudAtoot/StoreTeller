const productController = require('../controllers/product.controller');
const multer = require('multer');

// Set up storage for uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/api/products', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gif', maxCount: 1 }]), productController.createProduct);
    app.get('/api/products', productController.getAllProducts);
    app.get('/api/products/categories', productController.getAllCategories);
    app.get('/api/products/:id', productController.getProductById);
    app.put('/api/products/:id', productController.updateProduct);
    app.delete('/api/products/:id', productController.deleteProduct);
};
