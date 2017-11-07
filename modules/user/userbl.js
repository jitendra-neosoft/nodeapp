'use strict';
const userdb = require('./userdb');

module.exports.signup = (req, res) => {
    userdb.signup(req.body, (err, data) => {
        if (err) {
            return res.status(500).send({ success: false, data: err });
        }
        return res.status(200).send({ success: true, data: data });
    });
}

module.exports.signin = (req, res) => {
    userdb.signin(req.body, (err, data) => {
        if (err) {
            return res.status(500).send({ success: false, data: err });
        }
        return res.status(200).send({ success: true, data: data });
    });
}