const Product = require('../models/product.model');
const Shop = require('../models/shop.model');

module.exports = {
    createProduct: async (req, res) => {
        try {
            console.log('Received product creation request:', req.body);
            console.log('Received files:', req.files);

            const { name, description, price, category, shopName } = req.body;
            const image = req.files && req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
            const gif = req.files && req.files['gif'] ? `/uploads/${req.files['gif'][0].filename}` : null;

            if (!image) {
                console.error('Error: Product image is required.');
                return res.status(400).json({ message: 'Product image is required' });
            }

            const shop = await Shop.findOne({ name: shopName });
            if (!shop) {
                console.error('Error: Shop not found for shopName:', shopName);
                return res.status(404).json({ message: 'Shop not found' });
            }

            const newProduct = await Product.create({
                name,
                description,
                price,
                category,
                image,
                gif,
                shop: shop._id
            });
            console.log('Product created successfully:', newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const { shopName, category } = req.query;
            let products;
            const query = {};

            if (shopName) {
                const shop = await Shop.findOne({ name: shopName });
                if (!shop) {
                    return res.status(404).json({ message: 'Shop not found' });
                }
                query.shop = shop._id;
            }

            if (category && category !== 'All') {
                query.category = category;
            }

            products = await Product.find(query);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: 'Error updating product', error });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await Product.distinct('category');
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    }
};
