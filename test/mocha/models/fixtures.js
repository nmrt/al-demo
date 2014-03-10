'use strict';

var ObjectId = require('mongoose').Types.ObjectId;

exports.City = {
    foo: {code: 'FOO', name: 'Foobar', _id: new ObjectId()},
    bar: {code: 'BAR', name: 'Barbaz', _id: new ObjectId()}
};

exports.Flight = {
    foobar: {
        from: exports.City.foo._id,
        to: exports.City.bar._id,
        price: 100,
        schedule: [{date: new Date('March 11, 2014'), price: 95}],
        _id: new ObjectId()
    }
};

exports.Order = {
    foobar: {
        items: [{
            flight: exports.Flight.foobar._id,
            date: new Date('March 11, 2014'),
            count: 1
        }],
        _id: new ObjectId()
    }
};
