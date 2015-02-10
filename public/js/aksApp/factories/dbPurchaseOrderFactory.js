/*
 Purchase Order Database Service Factory

 CRUD methods for sale orders

 */
aksApp.factory("dbPurchaseOrderFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllPurchaseOrders: getAllPurchaseOrders,
        addPurchaseOrder: addPurchaseOrder,
        getPurchaseOrder: getPurchaseOrder,
        updatePurchaseOrder: updatePurchaseOrder,
        deletePurchaseOrder: deletePurchaseOrder,
    });

    //********************************************************************
    // get all sale orders
    //********************************************************************
    function getAllPurchaseOrders() {
        var deferred = $q.defer();

        $http.get('purchase-orders')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all sale orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single purchase order
    //********************************************************************
    function getPurchaseOrder(purchaseOrderId) {
        var deferred = $q.defer();

        $http.get('purchase-orders/' + purchaseOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add purchase order
    //********************************************************************
    function addPurchaseOrder(purchaseOrder) {
        var deferred = $q.defer();

        $http.post('purchase-orders', purchaseOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update purchase order
    //********************************************************************
    function updatePurchaseOrder(purchaseOrder) {
        var deferred = $q.defer();

        $http.put('purchase-orders/' + purchaseOrder.purchase_order_id, purchaseOrder)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating purchase order');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete purchase order
    //********************************************************************
    function deletePurchaseOrder(purchaseOrderId) {

        var deferred = $q.defer();

        $http.delete('purchase-orders/' + purchaseOrderId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting purchase order');
            });

        return deferred.promise;
    }
});