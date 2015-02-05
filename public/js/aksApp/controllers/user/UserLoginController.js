/*
 Controller for Login
 */

aksApp.controller('UserLoginController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            $scope.user = {};
            $scope.user.username = "";
            $scope.user.password = "";

            $scope.login = function() {
                // attempt to login
                dbUserFactory.login($scope.user).then(function(data) {

                    if (data.loginSuccess === true) {
                        // clear out variables and send user to dashboard
                        // with message
                        $scope.user.username = "";
                        //$scope.user.password = "";
                        flashMessageService.setMessage('Welcome ' + data.user.username + '!', 'success');
                        $location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage('Invalid username / password. Please try again.', 'danger');
                        $route.reload();
                    }
                });
            };

        }]);