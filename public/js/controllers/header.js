'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
        {title: 'List orders', state: 'orders/list'},
        {title: 'Create order', state: 'orders/create'}
    ];
    
    $scope.isCollapsed = false;
}]);
