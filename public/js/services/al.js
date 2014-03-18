'use strict';

angular.module('al')

.factory('Order', ['$resource', function($resource) {
    return $resource('/orders/:order', {order: '@_id'}, {
        query: {url: '/users/:user/orders', method: 'GET', isArray: true}
    });
}])

.factory('Flight', ['$resource', function($resource) {
    return $resource('/flights/:flight', {flight: '@_id'});
}])

.factory('City', ['$resource', function($resource) {
    return $resource('/cities/:city', {city: '@_id'});
}]);
