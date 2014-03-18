'use strict';

var mongoose = require('mongoose');
var params = require('./middlewares/params');
var authorization = require('./middlewares/authorization');
var ordersCtrl = require('../controllers/orders');
var Order = mongoose.model('Order');

module.exports = function(app) {
    params.extend(app);

    app.param('order', Order);

    app.all('/orders/*', authorization.requiresLogin);

    app.get('/orders/:order', ordersCtrl.show);
    app.post('/orders', ordersCtrl.create);
    app.post('/orders/:order', ordersCtrl.update);
    app.del('/orders/:order', ordersCtrl.remove);
};
