const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "First Name must be at least 3 characters"]

    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Last Name must be at least 3 characters"]

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Email must be valid"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a strong enough password!`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
