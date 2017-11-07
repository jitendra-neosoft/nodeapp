'use strict';

const jwt = require('jsonwebtoken');
const user = require('./usermodel');
const config = require('../../config/config');

var createToken = function (userid, req) {
    var payload = {
        sub: userid,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 86400000
    };
    return jwt.sign(payload, config.SECRET);
}

module.exports.signup = (input, callback) => {
    let adduser = new user(input);
    adduser.save((err, data) => {
        return callback(err, data);
    });
}

module.exports.userbyid = (input, callback) => {
    user.findOne({ 'username': input }, (err, data) => {
        return callback(err, data);
    });
}

module.exports.signin = (input, callback) => {
    let email = input.email.toLowerCase();
    let password = input.password;
    user.findOne({ 'email': email }, '+password', function (err, foundUser) {
        if (err) {
            return callback(err);
        }
        else {
            if (foundUser) {
                foundUser.comparePassword(password, function (err, isMatch) {
                    if (!isMatch) {
                        let err = new Error('invalid');
                        return callback(err);
                    }
                    else {
                        var sendData = {};
                        sendData.userId = foundUser._id;
                        sendData.name = foundUser.name;
                        sendData.email = foundUser.email;
                        sendData.token = createToken(foundUser._id);
                        return callback(null, sendData);
                    }
                });
            }
            else {
                let err = new Error('invalid');
                return callback(err);
            }
        }
    });
}