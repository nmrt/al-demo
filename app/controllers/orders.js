'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('Order');

exports.show = function(request, response) {
    request.params.order.fullyPopulate(function(error, order) {
        response.json(order);
    });
};

exports.create = function(request, response) {
    var order = new Order(request.body);

    request.user.orders.push(order);
    request.user.save(function(error) {
        if (error)
            throw error;

        response.json(order);
    });
};
