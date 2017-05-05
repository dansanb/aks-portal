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