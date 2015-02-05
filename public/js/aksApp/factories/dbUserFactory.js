/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
aksApp.factory("dbUserFactory", function($http, $q, $rootScope, $location) {


    var userName = "";
    var userId = 1;
    var loggedIn = false;





    // public API.
    return({
        login: login,
        logout: logout,
        getUserName: getUserName,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn,

        getUser: getUser
    });

    //********************************************************************
    // log into system
    //********************************************************************
    function login(user) {
        var deferred = $q.defer();

        $http.post('users/login', user)
            .success(function (data) {
                // check to see if login was successful and
                // save user information
                if (data.loginSuccess)  {
                    userName = data.user.username;
                    userId = data.user.id;
                    loggedIn = true;
                }
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // log out of system
    //********************************************************************
    function logout() {
        var deferred = $q.defer();

        $http.post('users/logout')
            .success(function (data) {

                // clear user variables
                userName = "";
                userId = null;
                loggedIn = false;

                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }


    function getUserName() {
        return userName;
    }

    function getUserId() {
        return userId;
    }

    function isLoggedIn() {
        return loggedIn;
    }


    //********************************************************************
    // log out of system
    //********************************************************************
    function getUser(userId) {
        var deferred = $q.defer();

        $http.get('users/' + userId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting user data');
            });

        return deferred.promise;
    }



});