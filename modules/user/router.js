'use strict';

const express = require('express');
const router = express.Router();
const userbl = require('./userbl');

router.post('/signup', userbl.signup);
router.post('/signin', userbl.signin);

module.exports = router;