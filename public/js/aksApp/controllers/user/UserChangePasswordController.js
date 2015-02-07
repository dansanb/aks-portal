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
                $scope.user.old_password = "";
                $scope.user.new_password = "";
                $scope.user.confirm_password = "";
            });


            //********************************************************************
            // update user password
            //********************************************************************
            $scope.updateUserPassword = function () {

                // update user password in database
                dbUserFactory.updateUserPassword($scope.user).then(function(response) {
                    // user password has been updated, display flash message
                    console.log(response);
                    if (response.success === true) {
                        flashMessageService.setMessage('Your password has been updated.', 'success');
                        $location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                        $route.reload();
                    }
                });
            };


        }]);