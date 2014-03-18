'use strict';

angular.module('al').controller('OrdersCtrl', [
    '$scope', '$http', '$state', '$stateParams', 'Global', 'Order', 'Flight',
    function($scope, $http, $state, $stateParams, Global, Order, Flight) {
        var orderItem = {flight: new Flight(), date: 'March 11, 2014'};

        $scope.global = Global;
        $scope.order = new Order({items: [angular.copy(orderItem)]});

        $scope.findOne = function() {
            Order.get({order: $stateParams.order}, function(order) {
                $scope.order = order;
            });
        };

        $scope.addItem = function() {
            $scope.order.items.push(angular.copy(orderItem));
        };

        $scope.removeItem = function(item) {
            for (var i in $scope.order.items) {
                if ($scope.order.items[i] === item)
                    $scope.order.items.splice(i, 1);
            }
        };

        $scope.list = function() {
            $scope.orders = Order.query({user: $scope.global.user._id});
        };

        $scope.save = function() {
            angular.forEach($scope.order.items, function(item) {
                item.flight = item.flight._id;
            });

            $scope.order.$save(function() {
                $state.go('orders/list');
            });
        };

        $scope.remove = function(order) {
            order.$remove(function() {
                for (var i in $scope.orders) {
                    if ($scope.orders[i] === order)
                        $scope.orders.splice(i, 1);
                }
            });
        };

        $scope.getCities = function(q) {
            return $http.get('/cities', {params: {q: q}}).then(function(response) {
                return response.data;
            });
        };

        $scope.getFlights = function(q) {
            $scope.flights = Flight.query(q);
        };

        $scope.setItemFlight = function(item, flight) {
            item.flight = flight;
            delete $scope.flights;
        };
    }
]);
