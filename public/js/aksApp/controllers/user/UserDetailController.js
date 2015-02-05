/*
 Controller for Login
 */

aksApp.controller('UserDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            $scope.user = {};
            $scope.userId =  $routeParams.user_id;


            // Get user details
            dbUserFactory.getUser($scope.userId).then(function(data) {
                $scope.user = data;
            });


        }]);