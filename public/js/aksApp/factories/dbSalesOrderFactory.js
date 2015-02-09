/*
 Sales Order Database Service Factory

 CRUD methods for sale orders

 */
aksApp.factory("dbSalesOrderFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllSaleOrders: getAllSaleOrders,
        addSalesOrder: addSalesOrder,
        getSalesOrder: getSalesOrder,
        updateSalesOrder: updateSalesOrder,
        deleteSalesOrder: deleteSalesOrder,
    });

    //********************************************************************
    // get all sale orders
    //********************************************************************
    function getAllSaleOrders() {
        var deferred = $q.defer();

        $http.get('sale-orders')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all sale orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single sales order
    //********************************************************************
    function getSalesOrder(salesOrderId) {
        var deferred = $q.defer();

        $http.get('sale-orders/' + salesOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add sales order
    //********************************************************************
    function addSalesOrder(salesOrder) {
        var deferred = $q.defer();

        $http.post('sale-orders', salesOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update sales order
    //********************************************************************
    function updateSalesOrder(salesOrder) {
        var deferred = $q.defer();
        console.log(salesOrder);
        $http.put('sale-orders/' + salesOrder.sales_order_id, salesOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating sales order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete sales order
    //********************************************************************
    function deleteSalesOrder(salesOrderId) {

        var deferred = $q.defer();

        $http.delete('sale-orders/' + salesOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting sales order');
            });

        return deferred.promise;
    }
});