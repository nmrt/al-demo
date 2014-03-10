'use strict';

var mongoose = require('mongoose');
var fullyPopulatedPaths = 'from to';

var flightSchema = new mongoose.Schema({
    from: {ref: 'City', type: mongoose.Schema.ObjectId, required: true},
    to: {ref: 'City', type: mongoose.Schema.ObjectId, required: true},
    price: {type: Number, required: true},
    schedule: [{date: Date, price: Number}]
});

flightSchema.static('fullyPopulate', function(collection, callback) {
    var klass = mongoose.model('Flight');
    klass.populate(collection, {path: fullyPopulatedPaths}, callback);
});

flightSchema.method('fullyPopulate', function(callback) {
    this.populate(fullyPopulatedPaths, callback);
});

mongoose.model('Flight', flightSchema);
