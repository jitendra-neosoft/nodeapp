'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

app.set('port', config.PORT);

app.use(bodyParser.json());

require('./utils/db');

app.use('/api', require('./modules/user/router'));

app.listen(app.get('port'), function(err){
    if(err){
        return console.log('Error', err);
    }
    console.log(`Server is listening on ${app.get('port')}`);
});