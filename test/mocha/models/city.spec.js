'use strict';

var should = require('should');
var mongoose = require('mongoose');
var fixtureLoader = require('pow-mongoose-fixtures');
var fixtures = require('./fixtures.js');
var City = mongoose.model('City');

describe('City model', function() {
    var city;

    beforeEach(function(done) {
        fixtureLoader.load(fixtures, mongoose.connection, function() {
            var id = fixtures.City.foo._id;
            City.findById(id).exec(function(error, foo) {
                city = foo;

                done();
            });
        });
    });

    describe('Code', function() {
        it('should fail validation with no data', function(done) {
            city.code = null;

            city.save(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.code.type.should.equal('required');

                done();
            });
        });

        it('should fail validation with invalid data', function(done) {
            city.code = 'foobar';

            city.save(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.code.type.should.equal('regexp');

                done();
            });
        });

        it('should pass validation with valid data', function(done) {
            city.code = 'FOO';

            city.save(function(error) {
                should.not.exist(error);

                done();
            });
        });
    });

    describe('Name', function() {
        it('should fail validation with no data', function(done) {
            city.name = null;

            city.save(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.name.type.should.equal('required');

                done();
            });
        });

        it('should be trimmed', function(done) {
            city.name = ' foo ';

            city.save(function(error, city) {
                city.name.should.be.exactly('foo');

                done();
            });
        });
    });
});
