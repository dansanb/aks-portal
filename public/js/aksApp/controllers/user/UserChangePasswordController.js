/*
 Controller for Login
 */

aksApp.controller('UserChangePasswordController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            $scope.user = {};
            $scope.userId =  $routeParams.user_id;

            // Get user details
            dbUserFactory.getUser($scope.userId).then(function(response) {
                $scope.user = response.data;

                // add additional members to the user object to allow for password change
                $scope.user.current_password = "";
                $scope.user.new_password = "";
                $scope.user.confirm_password = "";
            });


            //********************************************************************
            // update user password
            //********************************************************************
            $scope.changeUserPassword = function () {

                // update user password in database
                dbUserFactory.changeUserPassword($scope.user).then(function(response) {
                    // user password has been updated, display flash message
                    console.log(response);
                    if (response.success === true) {
                        flashMessageService.setMessage('Your password has been updated.', 'success');
                        //$location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                        //$route.reload();
                    }
                    $route.reload();
                });
            };


        }]);