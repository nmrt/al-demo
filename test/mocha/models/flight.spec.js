'use strict';

var mongoose = require('mongoose');
var Flight = mongoose.model('Flight');
var City = mongoose.model('City');

describe('Flight model', function() {
    var flight;
    var fakeCity;

    beforeEach(function(done) {
        var cities = [
            {code: 'FOO', name: 'Foobar'},
            {code: 'BAR', name: 'Barbaz'}
        ];

        fakeCity = {foo: 'bar'};

        City.create(cities, function(error, from, to) {
            flight = new Flight({
                from: from,
                to: to
            });

            done();
        });
    });

    describe('"From" city reference', function() {
        it('should fail validation with no data', function(done) {
            flight.from = null;

            flight.save(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.from.type.should.equal('required');

                done();
            });
        });

        it('should not accept other types', function(done) {
            flight.from = fakeCity;

            flight.save(function(error) {
                error.name.should.equal('CastError');
                error.path.should.equal('from');

                done();
            });
        });

        it('should have correct type', function(done) {
            Flight.populate(flight, {path: 'from'}, function() {
                flight.from.should.be.an.instanceOf(City);

                done();
            });
        });
    });

    describe('"To" city reference', function() {
        it('should fail validation with no data', function(done) {
            flight.to = null;

            flight.save(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.to.type.should.equal('required');

                done();
            });
        });

        it('should not accept other types', function(done) {
            flight.to = fakeCity;

            flight.save(function(error) {
                error.name.should.equal('CastError');
                error.path.should.equal('to');

                done();
            });
        });

        it('should have correct type', function(done) {
            Flight.populate(flight, {path: 'to'}, function() {
                flight.to.should.be.an.instanceOf(City);

                done();
            });
        });
    });
});
