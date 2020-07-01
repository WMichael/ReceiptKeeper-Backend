const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    googleid: String,
    role: String
}, {collection: 'users', timestamps: true});

module.exports = UserSchema;