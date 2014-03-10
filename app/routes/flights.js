'use strict';

var mongoose = require('mongoose');
var params = require('./middlewares/params');
var flightsCtrl = require('../controllers/flights');
var Flight = mongoose.model('Flight');

module.exports = function(app) {
    params.extend(app);

    app.param('flight', Flight);

    app.get('/flights', flightsCtrl.list);
    app.get('/flights/:flight', flightsCtrl.show);
};
