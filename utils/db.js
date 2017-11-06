'use strict';

const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.MONGODBURL, { useMongoClient: true });

mongoose.Promise = global.Promise;