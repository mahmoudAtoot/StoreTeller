const productController = require('../controllers/product.controller');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/api/products', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gif', maxCount: 1 }]), productController.createProduct);
    app.get('/api/products', productController.getAllProducts);
    app.get('/api/products/categories', productController.getAllCategories);
    app.get('/api/products/:id', productController.getProductById);
    app.put('/api/products/:id', productController.updateProduct);
    app.delete('/api/products/:id', productController.deleteProduct);
};
