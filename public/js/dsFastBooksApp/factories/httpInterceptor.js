// register the interceptor as a service
dsFastBooksApp.factory('httpInterceptor', function($rootScope, $q, $location) {



    return {
        // After every HTTP request, a status code is given:
        //
        //  200 : request was successful and function 'response' is executed
        //  401 : request was denied and function 'responseError' is executed
        //
        //  'response' function
        //      The object 'responseObject' will contain application data only
        //      and is accessible this way: response.data
        //
        //  'responseError' function
        //      The object 'rejectionObject' will contain authentication data only
        //      and is accessible this way: response.data, which contains properties
        //      that explain why a response failed:
        //          -> allowed : (true/false) Is allowed to perform request?
        //          -> loggedIn: (true/false) is user logged in?
        //          -> message : describes why request error ocurred



        //*********************************************************************
        // request was successful, and have received a response.
        //*********************************************************************
        'response': function(response) {
            return response;

        },

        //*********************************************************************
        // request failed, and have received a response.
        //*********************************************************************
        'responseError': function(rejection) {
            // check to see if user is logged in
            if (rejection.data.loggedIn === false)
            {
                // send user to login page
                $location.path('/login');
            }
            else {

            }

            return $q.reject(rejection);
        }
    };
});
