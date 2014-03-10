'use strict';

var should = require('should');
var mongoose = require('mongoose');
var fixtureLoader = require('pow-mongoose-fixtures');
var fixtures = require('./fixtures.js');
var Order = mongoose.model('Order');
var Flight = mongoose.model('Flight');

describe('Order model', function() {
    var order;
    var orderItem;

    beforeEach(function(done) {
        fixtureLoader.load(fixtures, mongoose.connection, function() {
            var id = fixtures.Order.foobar._id;
            Order.findById(id).exec(function(error, foobar) {
                order = foobar;
                orderItem = order.items[0];

                done();
            });
        });
    });

    it('should have correct schema', function(done) {
        Order.populate(order, {path: 'items.flight'}, function() {
            orderItem.flight.should.be.instanceOf(Flight);
            orderItem.date.should.be.instanceOf(Date);
            orderItem.count.should.be.of.type('number');

            done();
        });
    });

    it('should have default for items\' count', function(done) {
        delete orderItem.count;

        order.validate(function(error) {
            should.not.exist(error);
            orderItem.count.should.be.exactly(1);

            done();
        });
    });
});
