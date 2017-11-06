'use strict';

const user = require('./usermodel');

module.exports.loginController = (input, callback) => {
    let adduser = new user(input);
    adduser.save(function(err, data){
        if(err){
            return callback(err);
        }
        return callback(null, data);
    })
}