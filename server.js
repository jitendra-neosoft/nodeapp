'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./config/config');
const userdb = require('./modules/user/userdb');

app.set('port', config.PORT);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'production') {
    app.use((req, res, next) => {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

require('./utils/db');

// app.use('*', (req, res, next) => {
//     let domain = req.headers.host;
//     let subdomain = domain.split('.');
//     if(subdomain.length >= 2){
//         subdomain = subdomain[0].split("-").join(" ");
//     }
//     else{
//         subdomain = '';
//     }
//     userdb.userbyid(subdomain, (err, data) => {
//         if(err){
//             return res.render('pages/500');
//         }
//         if(!data){
//             return res.render('pages/404');
//         }
//         next();
//     })
// });

app.use('/api', require('./modules/user/router'));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/api', (req, res) => {
    res.render('pages/500');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.post('/prelogin', (req, res) => {
    let username = req.body.username || req.params.username || '';
    userdb.userbyid(username, (err, data) => {
        if (err) {
            return res.render('pages/500');
        }
        if (!data) {
            return res.render('pages/404');
        }
        return res.render('pages/about');
    });
});

app.listen(app.get('port'), (err) => {
    if (err) {
        return console.log('Error', err);
    }
    console.log(`Server is listening on ${app.get('port')}`);
});