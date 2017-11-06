'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

app.set('port', config.PORT);

app.use(bodyParser.json());

if (app.get('env') === 'production') {
    app.use((req, res, next) => {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

require('./utils/db');

app.use('/api', require('./modules/user/router'));

app.listen(app.get('port'), (err) => {
    if (err) {
        return console.log('Error', err);
    }
    console.log(`Server is listening on ${app.get('port')}`);
});