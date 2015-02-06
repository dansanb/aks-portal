/*
    aksApp

    Entry Point.
 */

var aksApp = angular.module('aksApp', [
    'ngRoute',
    'ngDialog'
]);

// routes
aksApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

        //****************************************************************
        // vendor routes
        //****************************************************************
        when('/vendors', {
            templateUrl: 'partials/vendor-list.html',
            controller: 'VendorListController'
        }).
        when('/vendors/:vendor_id', {
            templateUrl: 'partials/vendor-detail.html',
            controller: 'VendorDetailController'
        }).

        //****************************************************************
        // customer routes
        //****************************************************************
        when('/customers', {
            templateUrl: 'partials/customer-list.html',
            controller: 'CustomerListController'
        }).
        when('/customers/:customer_id', {
            templateUrl: 'partials/customer-detail.html',
            controller: 'CustomerDetailController'
        }).


        //****************************************************************
        // User Routes
        //****************************************************************
        // user login
        when('/login', {
            templateUrl: 'partials/user-login-form.html',
            controller: 'UserLoginController'
        }).

        // user dashboard
        when('/dashboard', {
            templateUrl: 'partials/user-dashboard.html',
            controller: 'UserDashboard'
        }).


        // edit user profile
        when('/user/:user_id', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailController'
        }).



        otherwise({
            // send them to login page
            redirectTo: '/login'
        });
}]);

aksApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

aksApp.run(
    ['$rootScope', '$location', 'flashMessageService', 'dbUserFactory',
    function($rootScope, $location, flashMessageService, dbUserFactory)
    {
    // when a new route is requested, make sure user has
    // access to the route

        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            // if 'nextRoute' is undefined, exit.
            if (typeof nextRoute == 'undefined') {
                console.log('next route undefined');
                return;
            }

            // if $$route property is missing, exit
            if (nextRoute.hasOwnProperty('$$route') === false) {
                console.log('next route does not have $$rote');
                return;
            }

            // if controller is our login controller, exit. we want to allow that.
            if (nextRoute.$$route.controller == 'UserLoginController') {
                console.log('next route controller is UserLoginController');
                return;
            }

            // check all other routes
            if (dbUserFactory.isLoggedIn() === false) {
                flashMessageService.setMessage('Please login first to use that feature.', 'warning');
                $location.path('/login');
            }
        });
}]);
/*
 Customer Database Service Factory

 CRUD methods for customer and customer contacts

 */
aksApp.factory("dbCustomerFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllCustomers: getAllCustomers,
        addCustomer: addCustomer,
        getCustomer: getCustomer,
        updateCustomer: updateCustomer,
        deleteCustomer: deleteCustomer,

        // vendor contacts operations
        getAllCustomerContacts: getAllCustomerContacts,
        addCustomerContact: addCustomerContact,
        updateCustomerContact: updateCustomerContact,
        deleteCustomerContact: deleteCustomerContact
    });

    //********************************************************************
    // get all customers
    //********************************************************************
    function getAllCustomers() {
        var deferred = $q.defer();

        $http.get('customers')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all customers');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single Customer
    //********************************************************************
    function getCustomer(customerId) {
        var deferred = $q.defer();

        $http.get('customers/' + customerId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add customer
    //********************************************************************
    function addCustomer(customer) {
        var deferred = $q.defer();

        $http.post('customers', customer)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update customer
    //********************************************************************
    function updateCustomer(customer) {
        var deferred = $q.defer();

        $http.put('customers/' + customer.customer_id, customer)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete customer
    //********************************************************************
    function deleteCustomer(customerContactId) {

        var deferred = $q.defer();

        $http.delete('customers/' + customerContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting customer');
            });

        return deferred.promise;
    }




    //********************************************************************
    // get customer contacts
    //********************************************************************
    function getAllCustomerContacts(customerId) {

        var deferred = $q.defer();

        $http.get('customer-contacts/' + customerId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting customer contacts');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add customer contact
    //********************************************************************
    function addCustomerContact(contact) {
        var deferred = $q.defer();

        $http.post('customer-contacts', contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding customer contact');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update customer contact
    //********************************************************************
    function updateCustomerContact(contact) {
        var deferred = $q.defer();

        $http.put('customer-contacts/' + contact.customer_contact_id, contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating customer contact');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete customer contact
    //********************************************************************
    function deleteCustomerContact(customerContactId) {

        var deferred = $q.defer();

        $http.delete('customer-contacts/' + customerContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting customer contact');
            });

        return deferred.promise;
    }
});
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
/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
aksApp.factory("dbVendorFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllVendors: getAllVendors,
        addVendor: addVendor,
        getVendor: getVendor,
        updateVendor: updateVendor,
        deleteVendor: deleteVendor,

        // vendor contacts operations
        getAllVendorContacts: getAllVendorContacts,
        addVendorContact: addVendorContact,
        updateVendorContact: updateVendorContact,
        deleteVendorContact: deleteVendorContact
    });

    //********************************************************************
    // get all vendors
    //********************************************************************
    function getAllVendors() {
        var deferred = $q.defer();

        $http.get('vendors')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single vendor
    //********************************************************************
    function getVendor(vendorId) {
        var deferred = $q.defer();

        $http.get('vendors/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add vendor
    //********************************************************************
    function addVendor(vendor) {
        var deferred = $q.defer();

        $http.post('vendors', vendor)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update vendor
    //********************************************************************
    function updateVendor(vendor) {
        var deferred = $q.defer();

        $http.put('vendors/' + vendor.vendor_id, vendor)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete vendor
    //********************************************************************
    function deleteVendor(vendorContactId) {

        var deferred = $q.defer();

        $http.delete('vendors/' + vendorContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }




    //********************************************************************
    // get vendor contacts
    //********************************************************************
    function getAllVendorContacts(vendorId) {

        var deferred = $q.defer();

        $http.get('vendor-contacts/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add vendor contact
    //********************************************************************
    function addVendorContact(contact) {
        var deferred = $q.defer();

        $http.post('vendor-contacts', contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update vendor contact
    //********************************************************************
    function updateVendorContact(contact) {
        var deferred = $q.defer();

        $http.put('vendor-contacts/' + contact.vendor_contact_id, contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete vendor contact
    //********************************************************************
    function deleteVendorContact(vendorContactId) {

        var deferred = $q.defer();

        $http.delete('vendor-contacts/' + vendorContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }
});
// register the interceptor as a service
aksApp.factory('httpInterceptor', function($rootScope, $q, $location) {



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

/*
    Flash message service

    Used to send flash notifications across redirects.

 */
aksApp.service("flashMessageService", function($rootScope) {
    var messageQueue = [];
    var alertQueue = [];

    var currentMessage = "";
    var currentAlertType = "";

    $rootScope.$on("$routeChangeSuccess", function() {
        currentMessage = messageQueue.shift() || "";
        currentAlertType = alertQueue.shift() || "";
    });

    // public API.
    return({
        setMessage: setMessage,
        getMessage: getMessage,
        getAlertType: getAlertType
    });


    function setMessage(message, type) {
        messageQueue.push(message);
        alertQueue.push(type);
    }
    function getMessage() {
        return currentMessage;
    }

    function getAlertType() {
        return currentAlertType;
    }
});
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

        $scope.getDisplayName = function() {
            return dbUserFactory.getDisplayName();
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
/*
 Controller for User Dashboard
 */

aksApp.controller('UserDashboard',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {


        }]);
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
            dbUserFactory.getUser($scope.userId).then(function(data) {
                $scope.user = data;
            });


        }]);
/*
 Controller for Login
 */

aksApp.controller('UserLoginController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            // pre-fill for testing
            $scope.user = {};
            $scope.user.email = "d@d.com";
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
/*
    Controller for Vendor Details
 */

aksApp.controller('VendorDetailController',
    ['$scope', '$location', '$routeParams', '$http', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
    function($scope, $location, $routeParams, $http, dbVendorFactory, flashMessageService, ngDialog) {

        $scope.vendorId =  $routeParams.vendor_id;
        $scope.vendorContacts = {};
        $scope.vendor = {};

        // Get vendor details
        dbVendorFactory.getVendor($scope.vendorId).then(function(response) {
            $scope.vendor = response.data;
        });

        // get list of vendor contacts
        dbVendorFactory.getAllVendorContacts($scope.vendorId).then(function(response) {
            $scope.vendorContacts = response.data;
        });



        //********************************************************************
        // update vendor to database and redirect to vendor list
        //********************************************************************
        $scope.updateVendor = function () {

            // update vendor contact in database
            dbVendorFactory.updateVendor($scope.vendor).then(function(response) {
                // vendor has been updated, redirect with flash message
                if (response.success === true) {
                    flashMessageService.setMessage('Vendor has been updated', 'success');
                    $location.path("/vendors");
                }
                else {
                    flashMessageService.setMessage(data.message, 'danger');
                }
            });
        };

        //********************************************************************
        // delete vendor from database and redirect to vendor list
        //********************************************************************
        $scope.deleteVendor = function () {

            $scope.dialogMessage = "Deleting this vendor will also delete all it's contacts. Are you sure you want to delete this vendor?";
            ngDialog.openConfirm({
                template: 'partials/dialog-yes-no.html',
                showClose: false,
                scope: $scope
            }).then (function (dialogData) {  // clicked yes
                // delete vendor contact
                dbVendorFactory.deleteVendor($scope.vendorId).then(function(response) {

                    // vendor has been deleted, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('Vendor has been deleted.', 'success');
                        $location.path("/vendors");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                    }

                });
            });
        };

        //********************************************************************
        // Handle "Add Contact" Button Click
        //********************************************************************
        $scope.addVendorContact = function () {
            // display "edit contact" dialog
            $scope.contactCopy = {};
            $scope.contactCopy.vendor_id = $scope.vendorId;
            $scope.dialogTitle = 'New Vendor Contact';

            ngDialog.openConfirm({
                template: 'partials/vendor-contact-form.html',
                showClose: false,
                scope: $scope
            }).then (function (dialogData) {  // clicked save
                // update vendor contact in database
                dbVendorFactory.addVendorContact($scope.contactCopy).then(function(response) {
                    // update vendor contact in cache data
                    $scope.vendorContacts.push($scope.contactCopy);
                    $scope.contactCopy = {};
                });
            });
        };

        //********************************************************************
        // Handle "Edit Vendor Contact" Button Click
        //********************************************************************
        $scope.editVendorContact = function ( contact ) {
            // display "edit contact" dialog
            $scope.contactCopy = angular.copy(contact);
            $scope.contactCopyIndex = $scope.vendorContacts.indexOf(contact);
            $scope.dialogTitle = 'Edit Vendor Contact';

            ngDialog.openConfirm({
                template: 'partials/vendor-contact-form.html',
                showClose: false,
                scope: $scope
            }).then (function (dialogData) {  // clicked save
                // update vendor contact in database
                dbVendorFactory.updateVendorContact($scope.contactCopy).then(function(response) {
                    // update vendor contact in cache data
                    $scope.vendorContacts[ $scope.contactCopyIndex ] = $scope.contactCopy;
                    $scope.contactCopy = {};
                    $scope.contactCopyIndex = null;
                });
            });
        };

        //********************************************************************
        // Handle "Delete Vendor Contact" Button Click
        //********************************************************************
        $scope.deleteVendorContact = function ( contact ) {
            $scope.dialogMessage = "Are you sure you want to delete this contact?";
            ngDialog.openConfirm({
                template: 'partials/dialog-yes-no.html',
                showClose: false,
                scope: $scope
            }).then (function (dialogData) {  // clicked yes
                // delete vendor contact
                dbVendorFactory.deleteVendorContact(contact.vendor_contact_id).then(function(response) {
                    // refresh vendor contact list
                    dbVendorFactory.getAllVendorContacts($scope.vendorId).then(function(response) {
                        $scope.vendorContacts = response.data;
                    });

                });
            });
        };

    }]);
/*
    Controller for Vendor List
 */

aksApp.controller('VendorListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
    function($scope, $location, $routeParams, $http, dbVendorFactory, flashMessageService, ngDialog)
    {
        // Get all vendors
        dbVendorFactory.getAllVendors().then(function(response) {
            $scope.vendors = response.data;
        });


        //********************************************************************
        // Handle "Add Contact" Button Click
        //********************************************************************
        $scope.addVendor = function() {

            // display "add vendor name" dialog to get started
            $scope.dialogMessage = 'What is the name of new vendor?';
            $scope.dialogModel = {};
            $scope.dialogModel.inputValue = "";

            ngDialog.openConfirm({
                template: 'partials/dialog-create-input.html',
                showClose: false,
                scope: $scope
            }).then (function (data) {  // clicked create

                // create a new vendor
                var vendor = {};
                vendor.company_name =  $scope.dialogModel.inputValue;

                // add it to database, and redirect to
                // details page to finish adding the details
                dbVendorFactory.addVendor(vendor).then(function(response) {
                    $location.path("/vendors/" + response.data.id);
                });
            });
        };
    }]);
/*
 Controller for Vendor Details
 */

aksApp.controller('CustomerDetailController',
    ['$scope', '$location', '$routeParams', '$http', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbCustomerFactory, flashMessageService, ngDialog) {

            $scope.customerId =  $routeParams.customer_id;
            $scope.customerContacts = {};
            $scope.customer = {};

            // Get customer details
            dbCustomerFactory.getCustomer($scope.customerId).then(function(data) {
                $scope.customer = data;
            });

            // get list of customer contacts
            dbCustomerFactory.getAllCustomerContacts($scope.customerId).then(function(data) {
                $scope.customerContacts = data;
            });


            //********************************************************************
            // update customer to database and redirect to vendor list
            //********************************************************************
            $scope.updateCustomer = function () {

                // update customer contact in database
                dbCustomerFactory.updateCustomer($scope.customer).then(function(data) {
                    // customer has been updated, redirect with flash message
                    if (data.success === true) {
                        flashMessageService.setMessage(data.message, 'success');
                        $location.path("/customers");
                    }
                    else {
                        flashMessageService.setMessage(data.message, 'danger');
                    }
                });
            };

            //********************************************************************
            // delete customer from database and redirect to customer list
            //********************************************************************
            $scope.deleteCustomer = function () {

                $scope.dialogMessage = "Deleting this customer will also delete all it's contacts. Are you sure you want to delete this customer?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (data) {  // clicked yes
                    // delete customer
                    dbCustomerFactory.deleteCustomer($scope.customerId).then(function(data) {

                        // customer has been deleted, redirect with flash message
                        if (data.success === true) {
                            flashMessageService.setMessage(data.message, 'success');
                            $location.path("/customers");
                        }
                        else {
                            flashMessageService.setMessage(data.message, 'danger');
                        }

                    });
                });
            };

            //********************************************************************
            // Handle "Add customer contact" Button Click
            //********************************************************************
            $scope.addCustomerContact = function () {
                // display "edit contact" dialog
                $scope.contactCopy = {};
                $scope.contactCopy.customer_id = $scope.customerId;
                $scope.dialogTitle = 'New Customer Contact';

                ngDialog.openConfirm({
                    template: 'partials/vendor-contact-form.html',
                    showClose: false,
                    scope: $scope
                }).then (function (data) {  // clicked save
                    // update vendor contact in database
                    dbCustomerFactory.addCustomerContact($scope.contactCopy).then(function(data) {
                        // update customer contact in cache data
                        $scope.customerContacts.push($scope.contactCopy);
                        $scope.contactCopy = {};
                    });
                });
            };

            //********************************************************************
            // Handle "Edit customer Contact" Button Click
            //********************************************************************
            $scope.editCustomerContact = function ( contact ) {
                // display "edit contact" dialog
                $scope.contactCopy = angular.copy(contact);
                $scope.contactCopyIndex = $scope.customerContacts.indexOf(contact);
                $scope.dialogTitle = 'Edit Customer Contact';

                ngDialog.openConfirm({
                    template: 'partials/vendor-contact-form.html',
                    showClose: false,
                    scope: $scope
                }).then (function (data) {  // clicked save
                    // update customer contact in database
                    dbCustomerFactory.updateCustomerContact($scope.contactCopy).then(function(data) {
                        // update customer contact in cache data
                        $scope.customerContacts[ $scope.contactCopyIndex ] = $scope.contactCopy;
                        $scope.contactCopy = {};
                        $scope.contactCopyIndex = null;
                    });
                });
            };

            //********************************************************************
            // Handle "Delete customer Contact" Button Click
            //********************************************************************
            $scope.deleteCustomerContact = function ( contact ) {
                $scope.dialogMessage = "Are you sure you want to delete " + contact.first_name + " " + contact.last_name + "?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (data) {  // clicked yes
                    // delete customer contact
                    dbCustomerFactory.deleteCustomerContact(contact.customer_contact_id).then(function(data) {
                        // refresh customer contact list
                        dbCustomerFactory.getAllCustomerContacts($scope.customerId).then(function(data) {
                            $scope.customerContacts = data;
                        });

                    });
                });
            };

        }]);
/*
 Controller for Customer List
 */
aksApp.controller('CustomerListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbCustomerFactory, flashMessageService, ngDialog)
        {
            // Get all customers
            dbCustomerFactory.getAllCustomers().then(function(data) {
                $scope.customers = data;
            });


            //********************************************************************
            // Handle "Add Contact" Button Click
            //********************************************************************
            $scope.addCustomer = function() {

                // display "add customer name" dialog to get started
                $scope.dialogMessage = 'What is the name of new customer?';
                $scope.dialogModel = {};
                $scope.dialogModel.inputValue = "";

                ngDialog.openConfirm({
                    template: 'partials/dialog-create-input.html',
                    showClose: false,
                    scope: $scope
                }).then (function (data) {  // clicked create

                    // create a new customer
                    var customer = {};
                    customer.company_name =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbCustomerFactory.addCustomer(customer).then(function(data) {
                        $location.path("/customers/" + data.id);
                    });
                });
            };
        }]);