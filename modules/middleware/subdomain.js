'use strict';

const userdb = require('../user/userdb');

module.exports.finduser = (req, res, next) => {
    let domain = req.headers.host;
    let subdomain = domain.split('.');
    if (subdomain.length >= 2) {
        subdomain = subdomain[0].split("-").join(" ");
    }
    else {
        subdomain = '';
    }
    userdb.userbyid(subdomain, (err, data) => {
        if (err) {
            return res.render('pages/500');
        }
        if (!data) {
            return res.render('pages/404');
        }
        next();
    })
}