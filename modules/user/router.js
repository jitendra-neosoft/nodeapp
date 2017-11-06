'use strict';

const express = require('express');
const router = express.Router();
const userbl = require('./userbl');

router.post('/signin', userbl.loginController);

module.exports = router;