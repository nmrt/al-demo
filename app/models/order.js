'use strict';

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    items: [{
        flight: {ref: 'Flight', type: mongoose.Schema.ObjectId, required: true},
        date: {type: Date, required: true},
        count: {type: Number, default: 1}
    }]
});

mongoose.model('Order', orderSchema);
