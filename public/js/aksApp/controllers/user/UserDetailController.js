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
            dbUserFactory.getUser($scope.userId).then(function(response) {
                $scope.user = response.data;

                // add additional members to the user object to allow for password change
                $scope.user.old_password = "";
                $scope.user.new_password = "";
                $scope.user.confirm_password = "";
            });


            //********************************************************************
            // update user to database and redirect to dashboard
            //********************************************************************
            $scope.updateUser = function () {

                // update user in database
                dbUserFactory.updateUser($scope.user).then(function(response) {
                    // customer has been updated, redirect with flash message
                    console.log(response);
                    if (response.success === true) {
                        flashMessageService.setMessage('You have updated your profile, ' + response.data.display_name, 'success');
                        $location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                        //$location.path("/user/" + $scope.user.id);
                        $route.reload();
                    }
                });
            };


        }]);