/*
    dsFastBooksApp - An application to keep track of sale orders, purchase orders, vendors and customers

    Entry Point.
 */

var dsFastBooksApp = angular.module('dsFastBooksApp', [
    'ngRoute',
    'ngDialog',
    'ngCookies',
    'ui.bootstrap'
]);

// configure angular ui components
dsFastBooksApp.config(['datepickerConfig', function(datepickerConfig) {
    datepickerConfig.showWeeks = false;
}]);

// routes
dsFastBooksApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.


        //****************************************************************
        // sales order routes
        //****************************************************************
        when('/sale-orders', {
            templateUrl: 'partials/sales-order-list.html',
            controller: 'SalesOrderListController'
        }).
        when('/sale-orders/:sales_order_id', {
            templateUrl: 'partials/sales-order-detail.html',
            controller: 'SalesOrderDetailController'
        }).

        //****************************************************************
        // purchase order routes
        //****************************************************************
        when('/purchase-orders', {
            templateUrl: 'partials/purchase-order-list.html',
            controller: 'PurchaseOrderListController'
        }).
        when('/purchase-orders/:purchase_order_id', {
            templateUrl: 'partials/purchase-order-detail.html',
            controller: 'PurchaseOrderDetailController'
        }).

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
            controller: 'UserDashboardController'
        }).


        // edit user profile
        when('/user/:user_id', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailController'
        }).

        // update user password
        when('/user-change-password/:user_id', {
            templateUrl: 'partials/user-change-password.html',
            controller: 'UserChangePasswordController'
        }).

        otherwise({
            // send them to login page
            redirectTo: '/login'
        });
}]);

dsFastBooksApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

dsFastBooksApp.run(
    ['$rootScope', '$location', 'flashMessageService', 'dbUserFactory',
    function($rootScope, $location, flashMessageService, dbUserFactory)
    {
    // when a new route is requested, make sure user has
    // access to the route

        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            // if 'nextRoute' is undefined, exit.
            if (typeof nextRoute == 'undefined') {
                return;
            }

            // if $$route property is missing, exit
            if (nextRoute.hasOwnProperty('$$route') === false) {
                return;
            }

            // if controller is our login controller, exit. we want to allow that.
            if (nextRoute.$$route.controller == 'UserLoginController') {
                return;
            }

            // check all other routes
            if (dbUserFactory.isLoggedIn() === false) {
                flashMessageService.setMessage('Please login first to use that feature.', 'warning');
                $location.path('/login');
            }
        });
}]);


// converts a mysql date to ISO format
// can do things in html files like:
// {{salesOrder.date_ordered | dateToISO | date:'mm/dd/yyyy'}}
dsFastBooksApp.filter('dateToISO', function() {
    return function(input) {
        input = new Date(input).toISOString();
        return input;
    };
});
/*
 Customer Database Service Factory

 CRUD methods for customer and customer contacts

 */
dsFastBooksApp.factory("dbCustomerFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllCustomers: getAllCustomers,
        getAllCustomersLite: getAllCustomersLite,
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
    // get all customers lite
    //********************************************************************
    function getAllCustomersLite() {
        var deferred = $q.defer();

        $http.get('customers-lite')
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
 Purchase Order Database Service Factory

 Sends API requests to the back-end API for purchase orders

 */
dsFastBooksApp.factory("dbPurchaseOrderFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllPurchaseOrders: getAllPurchaseOrders,
        addPurchaseOrder: addPurchaseOrder,
        getPurchaseOrder: getPurchaseOrder,
        updatePurchaseOrder: updatePurchaseOrder,
        deletePurchaseOrder: deletePurchaseOrder,
    });

    //********************************************************************
    // get all sale orders
    //********************************************************************
    function getAllPurchaseOrders() {
        var deferred = $q.defer();

        $http.get('purchase-orders')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all sale orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single purchase order
    //********************************************************************
    function getPurchaseOrder(purchaseOrderId) {
        var deferred = $q.defer();

        $http.get('purchase-orders/' + purchaseOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add purchase order
    //********************************************************************
    function addPurchaseOrder(purchaseOrder) {
        var deferred = $q.defer();

        $http.post('purchase-orders', purchaseOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update purchase order
    //********************************************************************
    function updatePurchaseOrder(purchaseOrder) {
        var deferred = $q.defer();

        $http.put('purchase-orders/' + purchaseOrder.purchase_order_id, purchaseOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete purchase order
    //********************************************************************
    function deletePurchaseOrder(purchaseOrderId) {

        var deferred = $q.defer();

        $http.delete('purchase-orders/' + purchaseOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting purchase order');
            });

        return deferred.promise;
    }
});
/*
 Sales Order Database Service Factory

 CRUD methods for sale orders

 */
dsFastBooksApp.factory("dbSalesOrderFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllSaleOrders: getAllSaleOrders,
        getAllSaleOrdersLite: getAllSaleOrdersLite,
        addSalesOrder: addSalesOrder,
        getSalesOrder: getSalesOrder,
        updateSalesOrder: updateSalesOrder,
        deleteSalesOrder: deleteSalesOrder,
    });

    //********************************************************************
    // get all sale orders
    //********************************************************************
    function getAllSaleOrders() {
        var deferred = $q.defer();

        $http.get('sale-orders')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all sale orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get all sale orders lite
    //********************************************************************
    function getAllSaleOrdersLite() {
        var deferred = $q.defer();

        $http.get('sale-orders-lite')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all sale orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single sales order
    //********************************************************************
    function getSalesOrder(salesOrderId) {
        var deferred = $q.defer();

        $http.get('sale-orders/' + salesOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add sales order
    //********************************************************************
    function addSalesOrder(salesOrder) {
        var deferred = $q.defer();

        $http.post('sale-orders', salesOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update sales order
    //********************************************************************
    function updateSalesOrder(salesOrder) {
        var deferred = $q.defer();

        $http.put('sale-orders/' + salesOrder.sales_order_id, salesOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete sales order
    //********************************************************************
    function deleteSalesOrder(salesOrderId) {

        var deferred = $q.defer();

        $http.delete('sale-orders/' + salesOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting sales order');
            });

        return deferred.promise;
    }
});
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
/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
dsFastBooksApp.factory("dbVendorFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllVendors: getAllVendors,
        getAllVendorsLite: getAllVendorsLite,
        addVendor: addVendor,
        getVendor: getVendor,
        getPurchaseOrderHistory: getPurchaseOrderHistory,
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
    // get all vendors lite
    //********************************************************************
    function getAllVendorsLite() {
        var deferred = $q.defer();

        $http.get('vendors-lite')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all vendors');
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
    // get a list of purchase orders from vendor
    //********************************************************************
    function getPurchaseOrderHistory(vendorId) {
        var deferred = $q.defer();

        $http.get('vendors-purchase-order-history/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting purchase orders');
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

/*
    Flash message service

    Used to send flash notifications across redirects.

 */
dsFastBooksApp.service("flashMessageService", function($rootScope) {
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
dsFastBooksApp.controller('HeaderController',
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
 AngularJS Controller for Purchase Order Details

 This controller handles the "new" and "update" operations for purchase orders.

 */

dsFastBooksApp.controller('PurchaseOrderDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbPurchaseOrderFactory', 'dbVendorFactory', 'dbSalesOrderFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbPurchaseOrderFactory, dbVendorFactory, dbSalesOrderFactory, flashMessageService, ngDialog) {

            $scope.purchaseOrderId =  $routeParams.purchase_order_id;
            $scope.purchaseOrder = {};
            $scope.purchaseOrder.created_at = "1/1/2001";   // set starting dummy date - otherwise we get Error: error:interr Interpolation Error
            $scope.customers = {};
            $scope.purchaseOrders = {};

            // datepicker
            $scope.datePickers =  {
                dateOrdered: false,
                dateRequired: false,
                dateDelivered: false
            };

            $scope.open = function($event, which) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePickers[which]= true;
            };

            // Get purchase order details
            dbPurchaseOrderFactory.getPurchaseOrder($scope.purchaseOrderId).then(function(response) {
                $scope.purchaseOrder = response.data;

                // once purchase order detail are obtained, request list of all
                // previous purchase orders from this vendor
                dbVendorFactory.getPurchaseOrderHistory($scope.purchaseOrder.vendor_id).then(function(response){
                    $scope.purchaseOrderHistory = response.data;
                });
            });


            // Get vendor lite list
            dbVendorFactory.getAllVendorsLite().then(function(response) {
                $scope.vendors = response.data;
            });


            // Get sale orders lite list
            dbSalesOrderFactory.getAllSaleOrdersLite().then(function(response) {
                $scope.saleOrders = response.data;
            });

            //********************************************************************
            // update purchase order to database and redirect to purchase order list
            //********************************************************************
            $scope.updatePurchaseOrder = function () {

                // update purchase order contact in database
                dbPurchaseOrderFactory.updatePurchaseOrder($scope.purchaseOrder).then(function(response) {
                    //purchase order has been updated, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('Purchase Order has been updated', 'success');
                        //$location.path("/purchase-orders");
                    }
                    else {
                        flashMessageService.setMessage(data.message, 'danger');
                    }
                    $route.reload();
                });
            };

            //********************************************************************
            // delete purchase order from database and redirect to purchase order list
            //********************************************************************
            $scope.deletePurchaseOrder = function () {

                $scope.dialogMessage = "Are you sure you want to delete this purchase order?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked yes
                    // delete purchase order contact
                    dbPurchaseOrderFactory.deletePurchaseOrder($scope.purchaseOrderId).then(function(response) {

                        // purchase order has been deleted, redirect with flash message
                        if (response.success === true) {
                            flashMessageService.setMessage('Purchase order has been deleted.', 'success');
                            $location.path("/purchase-orders");
                        }
                        else {
                            flashMessageService.setMessage(response.message, 'danger');
                        }

                    });
                });
            };

        }]);
/*
 AngularJS Controller for Purchase Order List
 */
dsFastBooksApp.controller('PurchaseOrderListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbPurchaseOrderFactory', 'dbVendorFactory', 'dbSalesOrderFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbPurchaseOrderFactory, dbVendorFactory, dbSalesOrderFactory, flashMessageService, ngDialog)
        {
            $scope.purchaseOrders = {};
            $scope.vendors = {};
            $scope.saleOrders = {};

            // Get all sale orders
            dbPurchaseOrderFactory.getAllPurchaseOrders().then(function(response) {
                $scope.purchaseOrders = response.data;
            });

            // Get all vendors lite
            dbVendorFactory.getAllVendorsLite().then(function(response) {
                $scope.vendors = response.data;
            });

            // Get sales orders lite
            dbSalesOrderFactory.getAllSaleOrdersLite().then(function(response) {
                $scope.saleOrders = response.data;
            });


            //********************************************************************
            // Handle "Add" Button Click
            //********************************************************************
            $scope.addPurchaseOrder = function() {

                // display dialog to get started
                $scope.dialogMessage = 'Select sales order and vendor for new purchase order:';
                $scope.dialogModel = {};
                $scope.dialogModel.vendorId = "";
                $scope.dialogModel.salesOrderId = "";

                ngDialog.openConfirm({
                    template: 'partials/dialog-create-purchase-order.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked create

                    // create a new purchase order
                    var purchaseOrder = {};
                    purchaseOrder.vendor_id =  $scope.dialogModel.vendorId;
                    purchaseOrder.sales_order_id =  $scope.dialogModel.salesOrderId;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbPurchaseOrderFactory.addPurchaseOrder(purchaseOrder).then(function(response) {
                        $location.path("/purchase-orders/" + response.data.purchase_order_id);
                    });
                });
            };
        }]);
/*
 Controller for Vendor Details
 */

dsFastBooksApp.controller('CustomerDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route,  dbCustomerFactory, flashMessageService, ngDialog) {

            $scope.customerId =  $routeParams.customer_id;
            $scope.customerContacts = {};
            $scope.customer = {};

            // Get customer details
            dbCustomerFactory.getCustomer($scope.customerId).then(function(response) {
                $scope.customer = response.data;
            });

            // get list of customer contacts
            dbCustomerFactory.getAllCustomerContacts($scope.customerId).then(function(response) {
                $scope.customerContacts = response.data;
            });


            //********************************************************************
            // update customer to database and redirect to vendor list
            //********************************************************************
            $scope.updateCustomer = function () {

                // update customer contact in database
                dbCustomerFactory.updateCustomer($scope.customer).then(function(response) {
                    // customer has been updated, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('Customer has been updated.', 'success');
                        //$location.path("/customers");
                    }
                    else {
                        flashMessageService.setMessage(response.message, 'danger');
                    }
                    $route.reload();
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
                }).then (function (dialogData) {  // clicked yes
                    // delete customer
                    dbCustomerFactory.deleteCustomer($scope.customerId).then(function(response) {

                        // customer has been deleted, redirect with flash message
                        if (response.success === true) {
                            flashMessageService.setMessage('Customer has been deleted.', 'success');
                            $location.path("/customers");
                        }
                        else {
                            flashMessageService.setMessage(response.message, 'danger');
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
                }).then (function (dialogData) {  // clicked save
                    // update vendor contact in database
                    dbCustomerFactory.addCustomerContact($scope.contactCopy).then(function(response) {
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
                }).then (function (dialogData) {  // clicked save
                    // update customer contact in database
                    dbCustomerFactory.updateCustomerContact($scope.contactCopy).then(function(response) {
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
                $scope.dialogMessage = "Are you sure you want to delete this customer?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked yes
                    // delete customer contact
                    dbCustomerFactory.deleteCustomerContact(contact.customer_contact_id).then(function(response) {
                        // refresh customer contact list
                        dbCustomerFactory.getAllCustomerContacts($scope.customerId).then(function(response) {
                            $scope.customerContacts = response.data;
                        });

                    });
                });
            };

        }]);
/*
 Controller for Customer List
 */
dsFastBooksApp.controller('CustomerListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbCustomerFactory, flashMessageService, ngDialog)
        {
            // Get all customers
            dbCustomerFactory.getAllCustomers().then(function(response) {
                $scope.customers = response.data;
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
                }).then (function (dialogData) {  // clicked create

                    // create a new customer
                    var customer = {};
                    customer.company_name =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbCustomerFactory.addCustomer(customer).then(function(response) {
                        $location.path("/customers/" + response.data.customer_id);
                    });
                });
            };
        }]);
/*
 Controller for Login
 */

dsFastBooksApp.controller('UserChangePasswordController',
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
/*
 Controller for User Dashboard
 */

dsFastBooksApp.controller('UserDashboardController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
        	$scope.userDisplayName = dbUserFactory.getDisplayName();

        }]);
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
/*
 Controller for Login
 */

dsFastBooksApp.controller('UserLoginController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbUserFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbUserFactory, flashMessageService, ngDialog)
        {
            // pre-fill for testing
            $scope.user = {};
            $scope.user.email = "daniel@dsfastbooks.app";
            $scope.user.password = "password";

            $scope.login = function() {
                // attempt to login
                dbUserFactory.login($scope.user).then(function(response) {

                    if (response.success === true) {
                        //flashMessageService.setMessage('Welcome ' + response.data.display_name + '!', 'success');
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
 Controller for Sales Order Details
 */

dsFastBooksApp.controller('SalesOrderDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbSalesOrderFactory', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbSalesOrderFactory, dbCustomerFactory, flashMessageService, ngDialog) {

            $scope.salesOrderId =  $routeParams.sales_order_id;
            $scope.salesOrder = {};
            $scope.salesOrder.created_at = "1/1/2001";
            $scope.customers = {};
            $scope.purchaseOrders = {};

            // datepicker
            $scope.datePickers =  {
                dateOrdered: false,
                dateRequired: false,
                dateDelivered: false
            };

            $scope.open = function($event, which) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePickers[which]= true;
            };

            // Get sales order details
            dbSalesOrderFactory.getSalesOrder($scope.salesOrderId).then(function(response) {
                $scope.salesOrder = response.data;
            });


            // Get customer lite list
            dbCustomerFactory.getAllCustomersLite().then(function(response) {
                $scope.customers = response.data;
            });


            //********************************************************************
            // update sales order to database and redirect to sales order list
            //********************************************************************
            $scope.updateSalesOrder = function () {

                // update sales order contact in database
                dbSalesOrderFactory.updateSalesOrder($scope.salesOrder).then(function(response) {
                    //sales order has been updated, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('Sales Order has been updated', 'success');
                        //$location.path("/sale-orders");
                    }
                    else {
                        flashMessageService.setMessage(data.message, 'danger');
                    }
                    $route.reload();
                });
            };

            //********************************************************************
            // delete sales order from database and redirect to sales order list
            //********************************************************************
            $scope.deleteSalesOrder = function () {

                $scope.dialogMessage = "Are you sure you want to delete this sales order?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked yes
                    // delete sales order contact
                    dbSalesOrderFactory.deleteSalesOrder($scope.salesOrderId).then(function(response) {

                        // sales order has been deleted, redirect with flash message
                        if (response.success === true) {
                            flashMessageService.setMessage('Sales order has been deleted.', 'success');
                            $location.path("/sale-orders");
                        }
                        else {
                            flashMessageService.setMessage(response.message, 'danger');
                        }

                    });
                });
            };

        }]);
/*
 Controller for Sales Order List
 */
dsFastBooksApp.controller('SalesOrderListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbSalesOrderFactory', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbSalesOrderFactory, dbCustomerFactory, flashMessageService, ngDialog)
        {
            // Get all sale orders
            dbSalesOrderFactory.getAllSaleOrders().then(function(response) {
                $scope.saleOrders = response.data;
            });

            // Get all customers lite
            dbCustomerFactory.getAllCustomersLite().then(function(response) {
                $scope.customers = response.data;
            });


            //********************************************************************
            // Handle "Add" Button Click
            //********************************************************************
            $scope.addSalesOrder = function() {

                // display dialog to get started
                $scope.dialogMessage = 'Select customer for new sales order:';
                $scope.dialogModel = {};
                $scope.dialogModel.inputValue = "";

                ngDialog.openConfirm({
                    template: 'partials/dialog-create-sales-order.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked create

                    // create a new sales order
                    var salesOrder = {};
                    salesOrder.customer_id =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbSalesOrderFactory.addSalesOrder(salesOrder).then(function(response) {
                        $location.path("/sale-orders/" + response.data.sales_order_id);
                    });
                });
            };
        }]);
/*
    Controller for Vendor Details
 */

dsFastBooksApp.controller('VendorDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
    function($scope, $location, $routeParams, $http, $route, dbVendorFactory, flashMessageService, ngDialog) {

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
                    //$location.path("/vendors");
                }
                else {
                    flashMessageService.setMessage(data.message, 'danger');
                }
                $route.reload();
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

dsFastBooksApp.controller('VendorListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
    function($scope, $location, $routeParams, $http, dbVendorFactory, flashMessageService, ngDialog)
    {
        // Get all vendors
        dbVendorFactory.getAllVendors().then(function (response) {
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
                    $location.path("/vendors/" + response.data.vendor_id);
                });
            });
        };
    }]);