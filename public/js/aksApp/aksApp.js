/*
    aksApp

    Entry Point.
 */

var aksApp = angular.module('aksApp', [
    'ngRoute',
    'ngDialog',
    'ui.bootstrap'
]);

// configure angular ui components
aksApp.config(['datepickerConfig', function(datepickerConfig) {
    datepickerConfig.showWeeks = false;
}]);

// routes
aksApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.


        //****************************************************************
        // sales order routes
        //****************************************************************
        when('/sale-orders', {
            templateUrl: 'partials/sales-order-list.html',
            controller: 'SalesOrderListController'
        }).
        when('/sale-orders/:sales_order_id', {
            templateUrl: 'partials/sales-order-detail.html',
            controller: 'SalesOrderDetailController'
        }).

        //****************************************************************
        // purchase order routes
        //****************************************************************
        when('/purchase-orders', {
            templateUrl: 'partials/purchase-order-list.html',
            controller: 'PurchaseOrderListController'
        }).
        when('/purchase-orders/:purchase_order_id', {
            templateUrl: 'partials/purchase-order-detail.html',
            controller: 'PurchaseOrderDetailController'
        }).

        //****************************************************************
        // vendor routes
        //****************************************************************
        when('/vendors', {
            templateUrl: 'partials/vendor-list.html',
            controller: 'VendorListController'
        }).
        when('/vendors/:vendor_id', {
            templateUrl: 'partials/vendor-detail.html',
            controller: 'VendorDetailController'
        }).

        //****************************************************************
        // customer routes
        //****************************************************************
        when('/customers', {
            templateUrl: 'partials/customer-list.html',
            controller: 'CustomerListController'
        }).
        when('/customers/:customer_id', {
            templateUrl: 'partials/customer-detail.html',
            controller: 'CustomerDetailController'
        }).


        //****************************************************************
        // User Routes
        //****************************************************************
        // user login
        when('/login', {
            templateUrl: 'partials/user-login-form.html',
            controller: 'UserLoginController'
        }).

        // user dashboard
        when('/dashboard', {
            templateUrl: 'partials/user-dashboard.html',
            controller: 'UserDashboardController'
        }).


        // edit user profile
        when('/user/:user_id', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailController'
        }).

        // update user password
        when('/user-change-password/:user_id', {
            templateUrl: 'partials/user-change-password.html',
            controller: 'UserChangePasswordController'
        }).



        otherwise({
            // send them to login page
            redirectTo: '/login'
        });
}]);

aksApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

aksApp.run(
    ['$rootScope', '$location', 'flashMessageService', 'dbUserFactory',
    function($rootScope, $location, flashMessageService, dbUserFactory)
    {
    // when a new route is requested, make sure user has
    // access to the route

        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            // if 'nextRoute' is undefined, exit.
            if (typeof nextRoute == 'undefined') {
                return;
            }

            // if $$route property is missing, exit
            if (nextRoute.hasOwnProperty('$$route') === false) {
                return;
            }

            // if controller is our login controller, exit. we want to allow that.
            if (nextRoute.$$route.controller == 'UserLoginController') {
                return;
            }

            // check all other routes
            if (dbUserFactory.isLoggedIn() === false) {
                flashMessageService.setMessage('Please login first to use that feature.', 'warning');
                $location.path('/login');
            }
        });
}]);

