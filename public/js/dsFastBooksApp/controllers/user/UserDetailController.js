/*
 Controller for Login
 */

dsFastBooksApp.controller('UserDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            $scope.user = {};
            $scope.userId =  $routeParams.user_id;


            // Get user details
            dbUserFactory.getUser($scope.userId).then(function(response) {
                $scope.user = response.data;
            });


            //********************************************************************
            // update user to database and redirect to dashboard
            //********************************************************************
            $scope.updateUser = function () {

                // update user in database
                dbUserFactory.updateUser($scope.user).then(function(response) {
                    // customer has been updated, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('You have updated your profile, ' + response.data.display_name, 'success');
                        //$location.path("/dashboard");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                        //$location.path("/user/" + $scope.user.id);
                    }
                    $route.reload();
                });
            };


        }]);