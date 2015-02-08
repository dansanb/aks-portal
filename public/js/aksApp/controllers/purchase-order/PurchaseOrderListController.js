/*
 Controller for Purchase Order List
 */
aksApp.controller('PurchaseOrderListController',
    ['$scope', '$location', '$routeParams', '$http', 'dbPurchaseOrderFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, dbPurchaseOrderFactory, flashMessageService, ngDialog)
        {
            // Get all purchase orders
            dbPurchaseOrderFactory.getAllPurchaseOrders().then(function(response) {
                $scope.purchaseOrders = response.data;
            });


            //********************************************************************
            // Handle "Add Contact" Button Click
            //********************************************************************
            $scope.addPurchaseOrder = function() {

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
                    var purchaseOrder = {};
                    purchaseOrder.company_name =  $scope.dialogModel.inputValue;

                    // add it to database, and redirect to
                    // details page to finish adding the details
                    dbPurchaseOrderFactory.addPurchaseOrder(purchaseOrder).then(function(response) {
                        $location.path("/purchase-orders/" + response.customer_id);
                    });
                });
            };
        }]);