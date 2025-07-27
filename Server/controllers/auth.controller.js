const User = require('../models/user.model');
const Shop = require('../models/shop.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, shopName } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        let shop = null;
        if (shopName) {
            // Check if shop name is already taken
            const existingShop = await Shop.findOne({ name: shopName });
            if (existingShop) {
                await User.deleteOne({ _id: newUser._id }); // Rollback user creation
                return res.status(400).json({ message: 'Shop name already taken' });
            }
            shop = await Shop.create({ name: shopName, owner: newUser._id });
            newUser.shop = shop._id;
            await newUser.save();
        }

        res.status(201).json({ message: 'User registered successfully', user: newUser, shop: shop });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user and populate shop information
        const user = await User.findOne({ email }).populate('shop');
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Create JWT
        const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '1d' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                shop: user.shop ? { id: user.shop._id, name: user.shop.name } : null,
                isOwner: !!user.shop
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
