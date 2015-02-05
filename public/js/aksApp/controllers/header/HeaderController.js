/*
    Header Controller

    Controller to access site-wide functionality, such as flash message
 */
aksApp.controller('HeaderController',
    ['$scope', '$location', 'flashMessageService', 'dbUserFactory',
    function ($scope, $location, flashMessageService, dbUserFactory)
    {
        $scope.getFlashMessage = function() {
            return flashMessageService.getMessage();
        };

        $scope.getFlashAlertType = function() {
            return flashMessageService.getAlertType();
        };

        $scope.getUserName= function() {
            return dbUserFactory.getUserName();
        };

        $scope.getUserId = function() {
            return dbUserFactory.getUserId();
        };

        $scope.isUserLoggedIn = function() {
            return dbUserFactory.isLoggedIn();
        };

        $scope.logout = function() {

            dbUserFactory.logout().then(function(data) {
                flashMessageService.setMessage('You have been logged out.', 'success');
                $location.path('/login');
            });
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };



    }]);