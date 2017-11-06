'use strict';
const userdb = require('./userdb');

module.exports.loginController = (req, res) => {
    userdb.loginController(req.body, (err, data) => {
        if (err) {
            return res.status(500).send({ success: false, data: err });
        }
        return res.status(200).send({ success: true, data: data });
    })
}