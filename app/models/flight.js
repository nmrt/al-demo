'use strict';

var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    from: {ref: 'City', type: mongoose.Schema.ObjectId, required: true},
    to: {ref: 'City', type: mongoose.Schema.ObjectId, required: true},
    price: {type: Number, required: true},
    schedule: [{date: Date, price: Number}]
});

mongoose.model('Flight', flightSchema);
