/*
 Controller for Customer List
 */
aksApp.controller('CustomerListController',
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