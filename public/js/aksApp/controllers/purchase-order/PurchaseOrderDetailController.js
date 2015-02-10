/*
 Controller for Purchase Order Details
 */

aksApp.controller('PurchaseOrderDetailController',
    ['$scope', '$location', '$routeParams', '$http', 'dbPurchaseOrderFactory', 'dbVendorFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbPurchaseOrderFactory, dbVendorFactory, flashMessageService, ngDialog) {

            $scope.purchaseOrderId =  $routeParams.purchase_order_id;
            $scope.purchaseOrder = {};
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
            });


            // Get vendor lite list
            dbVendorFactory.getAllVendorsLite().then(function(response) {
                $scope.vendors = response.data;
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
                        $location.path("/purchase-orders");
                    }
                    else {
                        flashMessageService.setMessage(data.message, 'danger');
                    }
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