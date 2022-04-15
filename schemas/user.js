const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    } 
});

const User = mongoose.model("users", userSchema);
module.exports = User;