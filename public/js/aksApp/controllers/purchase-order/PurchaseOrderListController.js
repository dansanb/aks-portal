/*
 AngularJS Controller for Purchase Order List
 */
aksApp.controller('PurchaseOrderListController',
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