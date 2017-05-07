/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
//dsFastBooksApp.factory("AuthenticationService",['$location', '$cookies', 'setUserCreds', function($location, $cookies, setUserCreds) {
dsFastBooksApp.factory("dbUserFactory", ['$http', '$q', '$rootScope', '$location', '$cookieStore', 
    function($http, $q, $rootScope, $location, $cookieStore) {

    var loggedIn = false;
    var loggedIn = $cookieStore.get('loggedIn');
    var userId = $cookieStore.get('userId');
    var displayName = $cookieStore.get('displayName');

    // public API.
    return({
        login: login,
        logout: logout,
        updateUser: updateUser,
        changeUserPassword: changeUserPassword,
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

                    $cookieStore.put('loggedIn', loggedIn);
                    $cookieStore.put('userId', userId);
                    $cookieStore.put('displayName', displayName);
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

                // delete cookie data
                $cookieStore.remove('displayName');
                $cookieStore.remove('userId');
                $cookieStore.remove('loggedIn');

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


    //********************************************************************
    // update user password
    //********************************************************************
    function changeUserPassword(user) {
        var deferred = $q.defer();

        $http.put('user-change-password/' + user.id, user)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating user password');
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



}]);