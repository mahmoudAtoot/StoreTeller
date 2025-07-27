const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [10, "Product description must be at least 10 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    image: {
        type: Buffer,
        required: [true, "Product image is required"],
    },
    imageMimeType: {
        type: String,
        required: [true, "Product image MIME type is required"],
    },
    gif: {
        type: Buffer,
        required: false,
    },
    gifMimeType: {
        type: String,
        required: false,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
