/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
aksApp.factory("dbUserFactory", function($http, $q, $rootScope, $location) {


    var displayName = "";
    var userId = 1;
    var loggedIn = false;





    // public API.
    return({
        login: login,
        logout: logout,
        updateUser: updateUser,
        getDisplayName: getDisplayName,
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
            .success(function (response) {
                // check to see if login was successful and
                // save user information
                if (response.success)  {
                    displayName = response.data.display_name;
                    userId = response.data.id;
                    loggedIn = true;
                }
                deferred.resolve(response);
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

    //********************************************************************
    // update user
    //********************************************************************
    function updateUser(user) {
        var deferred = $q.defer();

        $http.put('users/' + user.id, user)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating user');
            });

        return deferred.promise;
    }


    function getDisplayName() {
        return displayName;
    }

    function getUserId() {
        return userId;
    }

    function isLoggedIn() {
        return loggedIn;
    }


    //********************************************************************
    // get user information
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