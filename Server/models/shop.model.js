const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Shop name is required"],
        unique: true,
        minlength: [3, "Shop name must be at least 3 characters long"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);