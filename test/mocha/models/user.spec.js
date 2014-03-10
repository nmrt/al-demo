'use strict';

var mongoose = require('mongoose');
var fixtureLoader = require('pow-mongoose-fixtures');
var fixtures = require('./fixtures.js');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

describe('User model', function() {
    var user1;
    var user2;

    beforeEach(function(done) {
        fixtureLoader.load(fixtures, mongoose.connection, function() {
            User.findById(fixtures.User.u1._id).exec(function(error, u1) {
                user1 = u1;

                User.findById(fixtures.User.u2._id).exec(function(error, u2) {
                    user2 = u2;

                    done();
                });
            });
        });
    });

    it('should be able to hold the collection of orders', function(done) {
        User.populate(user1, {path: 'orders'}, function() {
            user1.orders[0].should.be.instanceOf(Order);

            done();
        });
    });

    it('should guarantee username uniqueness', function(done) {
        user2.username = user1.username;

        user2.save(function(error) {
            error.toString().should.match(/\bduplicate\b/);

            done();
        });
    });

    it('should validate the name', function(done) {
        user1.name = '';

        user1.validate(function(error) {
            error.name.should.equal('ValidationError');
            error.errors.name.type.should.equal('required');

            done();
        });
    });
});
