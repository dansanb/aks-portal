/*
 Controller for Login
 */

dsFastBooksApp.controller('UserLoginController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            // pre-fill for testing
            $scope.user = {};
            $scope.user.email = "daniel@aquaklean.com";
            $scope.user.password = "1";

            $scope.login = function() {
                // attempt to login
                dbUserFactory.login($scope.user).then(function(response) {

                    if (response.success === true) {
                        flashMessageService.setMessage('Welcome ' + response.data.display_name + '!', 'success');
                        $location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage('Invalid email / password. Please try again.', 'danger');
                        $route.reload();
                    }
                });
            };

        }]);