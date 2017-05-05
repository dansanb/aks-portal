/*
 Vendor Database Service Factory

 CRUD methods for vendor and vendor contacts

 */
dsFastBooksApp.factory("dbVendorFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllVendors: getAllVendors,
        getAllVendorsLite: getAllVendorsLite,
        addVendor: addVendor,
        getVendor: getVendor,
        getPurchaseOrderHistory: getPurchaseOrderHistory,
        updateVendor: updateVendor,
        deleteVendor: deleteVendor,

        // vendor contacts operations
        getAllVendorContacts: getAllVendorContacts,
        addVendorContact: addVendorContact,
        updateVendorContact: updateVendorContact,
        deleteVendorContact: deleteVendorContact
    });

    //********************************************************************
    // get all vendors
    //********************************************************************
    function getAllVendors() {
        var deferred = $q.defer();

        $http.get('vendors')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get all vendors lite
    //********************************************************************
    function getAllVendorsLite() {
        var deferred = $q.defer();

        $http.get('vendors-lite')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all vendors');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single vendor
    //********************************************************************
    function getVendor(vendorId) {
        var deferred = $q.defer();

        $http.get('vendors/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a list of purchase orders from vendor
    //********************************************************************
    function getPurchaseOrderHistory(vendorId) {
        var deferred = $q.defer();

        $http.get('vendors-purchase-order-history/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting purchase orders');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add vendor
    //********************************************************************
    function addVendor(vendor) {
        var deferred = $q.defer();

        $http.post('vendors', vendor)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update vendor
    //********************************************************************
    function updateVendor(vendor) {
        var deferred = $q.defer();

        $http.put('vendors/' + vendor.vendor_id, vendor)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete vendor
    //********************************************************************
    function deleteVendor(vendorContactId) {

        var deferred = $q.defer();

        $http.delete('vendors/' + vendorContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }




    //********************************************************************
    // get vendor contacts
    //********************************************************************
    function getAllVendorContacts(vendorId) {

        var deferred = $q.defer();

        $http.get('vendor-contacts/' + vendorId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add vendor contact
    //********************************************************************
    function addVendorContact(contact) {
        var deferred = $q.defer();

        $http.post('vendor-contacts', contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update vendor contact
    //********************************************************************
    function updateVendorContact(contact) {
        var deferred = $q.defer();

        $http.put('vendor-contacts/' + contact.vendor_contact_id, contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete vendor contact
    //********************************************************************
    function deleteVendorContact(vendorContactId) {

        var deferred = $q.defer();

        $http.delete('vendor-contacts/' + vendorContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting vendor contact data');
            });

        return deferred.promise;
    }
});