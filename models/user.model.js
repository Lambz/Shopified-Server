const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    }, 
    address: {
        type: String,
        required: true,
        minlength: 3
    },
    phoneNo: {
        type: Number,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    cart: {
        type: Array,
        required: true,
        minlength: 0
    },
    orders: {
        type: Array,
        required: true,
        minlength: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;