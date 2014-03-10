'use strict';

var mongoose = require('mongoose');
var City = mongoose.model('City');

exports.list = function(request, response) {
    var q = new RegExp(request.query.q, 'i');

    City.find({name: q}, function(error, cities) {
        response.json(cities);
    });
};
