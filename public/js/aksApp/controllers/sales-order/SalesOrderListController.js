/*
 Controller for Sales Order List
 */
aksApp.controller('SalesOrderListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbSalesOrderFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbSalesOrderFactory, flashMessageService, ngDialog)
        {
            // Get all sale orders
            dbSalesOrderFactory.getAllSaleOrders().then(function(response) {
                $scope.saleOrders = response.data;
            });


            //********************************************************************
            // Handle "Add" Button Click
            //********************************************************************
            $scope.addSalesOrder = function() {

                // display dialog to get started
                $scope.dialogMessage = 'Give a short description for new sales order:';
                $scope.dialogModel = {};
                $scope.dialogModel.inputValue = "";

                ngDialog.openConfirm({
                    template: 'partials/dialog-create-input.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked create

                    // create a new sales order
                    var salesOrder = {};
                    salesOrder.short_description =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbSalesOrderFactory.addSalesOrder(salesOrder).then(function(response) {
                        $location.path("/sale-orders/" + response.sales_order_id);
                    });
                });
            };
        }]);