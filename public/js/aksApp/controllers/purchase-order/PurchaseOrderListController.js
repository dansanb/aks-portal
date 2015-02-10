/*
 Controller for Purchase Order List
 */
aksApp.controller('PurchaseOrderListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbPurchaseOrderFactory', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbPurchaseOrderFactory, dbVendorFactory, flashMessageService, ngDialog)
        {
            // Get all sale orders
            dbPurchaseOrderFactory.getAllPurchaseOrders().then(function(response) {
                $scope.purchaseOrders = response.data;
            });

            // Get all vendors lite
            //dbVendorFactory.getAllVendorsLite().then(function(response) {
            //    $scope.customers = response.data;
            //});


            //********************************************************************
            // Handle "Add" Button Click
            //********************************************************************
            $scope.addPurchaseOrder = function() {

                // display dialog to get started
                $scope.dialogMessage = 'Select customer for new purchase order:';
                $scope.dialogModel = {};
                $scope.dialogModel.inputValue = "";

                ngDialog.openConfirm({
                    template: 'partials/dialog-create-purchase-order.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked create

                    // create a new purchase order
                    var purchaseOrder = {};
                    purchaseOrder.customer_id =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbPurchaseOrderFactory.addPurchaseOrder(purchaseOrder).then(function(response) {
                        $location.path("/sale-orders/" + response.data.purchase_order_id);
                    });
                });
            };
        }]);