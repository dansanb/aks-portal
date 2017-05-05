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