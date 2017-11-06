'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
});

let user = mongoose.model('users', userSchema);

module.exports = user;