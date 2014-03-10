'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Flight = mongoose.model('Flight');

var orderSchema = new mongoose.Schema({
    items: [{
        flight: {ref: 'Flight', type: mongoose.Schema.ObjectId, required: true},
        date: {type: Date, required: true},
        count: {type: Number, default: 1}
    }]
});

orderSchema.method('fullyPopulate', function(callback) {
    this.populate('items.flight', function(error, order) {
        var flights = _.map(order.items, function(x) { return x.flight; });

        Flight.fullyPopulate(flights, function() {
            callback(error, order);
        });
    });
});

mongoose.model('Order', orderSchema);
