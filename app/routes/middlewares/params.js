'use strict';

var mongoose = require('mongoose');

exports.extend = function(app) {
    app.param(function(param, klass) {
        function finder(request, response, next, id) {
            klass.findById(id).exec(function(error, model) {
                if (error)
                    return next(error);

                if (!model) {
                    var msg = ['Failed to find', param, 'by id', id];
                    return next(new Error(msg.join(' ')));
                }

                request.params[param] = model;
                next();
            });
        }

        for (var key in mongoose.models) {
            if (mongoose.models.hasOwnProperty(key)) {
                if (mongoose.models[key] === klass) {
                    return finder;
                }
            }
        }
    });
};
