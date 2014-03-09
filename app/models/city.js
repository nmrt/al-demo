'use strict';

var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    code: {type: String, match: /^[A-Z]{3}$/, required: true},
    name: {type: String, trim: true, required: true}
});

mongoose.model('City', citySchema);
