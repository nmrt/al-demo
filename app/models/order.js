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

orderSchema.static('fullyPopulate', function(orders, callback) {
    var klass = mongoose.model('Order');
    klass.populate(orders, {path: 'items.flight'}, function(error, orders) {
        var flights = _.map(orders, function(order) {
            return _.map(order.items, function(item) {
                return item.flight;
            });
        });

        flights = _.uniq(_.flatten(flights));

        Flight.fullyPopulate(flights, function() {
            callback(error, orders);
        });
    });
});

orderSchema.method('fullyPopulate', function(callback) {
    mongoose.model('Order').fullyPopulate([this], function(error, orders) {
        callback(error, orders[0]);
    });
});

mongoose.model('Order', orderSchema);
