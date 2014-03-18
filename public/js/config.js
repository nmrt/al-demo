'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider.state('home', {url: '/', templateUrl: 'views/index.html'});

    $stateProvider.state('orders/list', {
        url: '/orders/list',
        templateUrl: 'views/orders/list.html'
    });

    $stateProvider.state('orders/create', {
        url: '/orders/create',
        templateUrl: 'views/orders/create.html'
    });

    $stateProvider.state('orders/edit', {
        url: '/orders/:order/edit',
        templateUrl: 'views/orders/edit.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
