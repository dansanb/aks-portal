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