/*
    aksApp

    Entry Point.
 */

var aksApp = angular.module('aksApp', [
    'ngRoute',
    'ngDialog'
]);

// routes
aksApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

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
            controller: 'UserDashboard'
        }).


        // edit user profile
        when('/user/:user_id', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailController'
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
                console.log('next route undefined');
                return;
            }

            // if $$route property is missing, exit
            if (nextRoute.hasOwnProperty('$$route') === false) {
                console.log('next route does not have $$rote');
                return;
            }

            // if controller is our login controller, exit. we want to allow that.
            if (nextRoute.$$route.controller == 'UserLoginController') {
                console.log('next route controller is UserLoginController');
                return;
            }

            // check all other routes
            if (dbUserFactory.isLoggedIn() === false) {
                flashMessageService.setMessage('Please login first to use that feature.', 'warning');
                $location.path('/login');
            }
        });
}]);