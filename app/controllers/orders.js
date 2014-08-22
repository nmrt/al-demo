'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

exports.show = function(request, response) {
    request.params.order.fullyPopulate(function(error, order) {
        response.json(order);
    });
};

exports.create = function(request, response) {
    var order = new Order(request.body);

    order.save(function(error, order) {
        if (error)
            return console.error(error);

        // Pushing to `user.orders' as it's one-way association.
        request.user.orders.push(order);
        request.user.save(function(error) {
            if (error)
                return console.error(error);

            response.json(order);
        });
    });
};

exports.update = function(request, response) {
    var order = _.extend(request.params.order, request.body);

    order.save(function(error, order) {
        if (error)
            return console.error(error);

        response.json(order);
    });
};

exports.remove = function(request, response) {
    request.params.order.remove(function(error, order) {
        if (error)
            return console.error(error);

        response.json(order);
    });
};
