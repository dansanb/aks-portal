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