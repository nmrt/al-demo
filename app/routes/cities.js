'use strict';

var citiesCtrl = require('../controllers/cities');

module.exports = function(app) {
    app.get('/cities', citiesCtrl.list);
};
