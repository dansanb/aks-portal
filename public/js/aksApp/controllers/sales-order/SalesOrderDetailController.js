/*
 Controller for Sales Order Details
 */

aksApp.controller('SalesOrderDetailController',
    ['$scope', '$location', '$routeParams', '$http', '$route', 'dbSalesOrderFactory', 'dbCustomerFactory', 'flashMessageService', 'ngDialog',
        function($scope, $location, $routeParams, $http, $route, dbSalesOrderFactory, dbCustomerFactory, flashMessageService, ngDialog) {

            $scope.salesOrderId =  $routeParams.sales_order_id;
            $scope.salesOrder = {};
            $scope.salesOrder.created_at = "1/1/2001";
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

            // Get sales order details
            dbSalesOrderFactory.getSalesOrder($scope.salesOrderId).then(function(response) {
                $scope.salesOrder = response.data;
                console.log($scope.salesOrder);
            });


            // Get customer lite list
            dbCustomerFactory.getAllCustomersLite().then(function(response) {
                $scope.customers = response.data;
            });


            //********************************************************************
            // update sales order to database and redirect to sales order list
            //********************************************************************
            $scope.updateSalesOrder = function () {

                // update sales order contact in database
                dbSalesOrderFactory.updateSalesOrder($scope.salesOrder).then(function(response) {
                    //sales order has been updated, redirect with flash message
                    if (response.success === true) {
                        flashMessageService.setMessage('Sales Order has been updated', 'success');
                        //$location.path("/sale-orders");
                    }
                    else {
                        flashMessageService.setMessage(data.message, 'danger');
                    }
                    $route.reload();
                });
            };

            //********************************************************************
            // delete sales order from database and redirect to sales order list
            //********************************************************************
            $scope.deleteSalesOrder = function () {

                $scope.dialogMessage = "Are you sure you want to delete this sales order?";
                ngDialog.openConfirm({
                    template: 'partials/dialog-yes-no.html',
                    showClose: false,
                    scope: $scope
                }).then (function (dialogData) {  // clicked yes
                    // delete sales order contact
                    dbSalesOrderFactory.deleteSalesOrder($scope.salesOrderId).then(function(response) {

                        // sales order has been deleted, redirect with flash message
                        if (response.success === true) {
                            flashMessageService.setMessage('Sales order has been deleted.', 'success');
                            $location.path("/sale-orders");
                        }
                        else {
                            flashMessageService.setMessage(response.message, 'danger');
                        }

                    });
                });
            };

        }]);