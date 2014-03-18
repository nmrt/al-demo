'use strict';

var mongoose = require('mongoose');
var Flight = mongoose.model('Flight');

exports.list = function(request, response) {
    Flight.find(request.query, function(error, flights) {
        Flight.fullyPopulate(flights, function(error, flights) {
            response.json(flights);
        });
    });
};

exports.show = function(request, response) {
    request.params.flight.fullyPopulate(function(error, flight) {
        response.json(flight);
    });
};
