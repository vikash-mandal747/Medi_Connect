const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'doctor'], default: 'user' },
    address: { type: String },
    contact: { type: Number }
}, { timestamps: true });


const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel