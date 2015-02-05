/*
 Customer Database Service Factory

 CRUD methods for customer and customer contacts

 */
aksApp.factory("dbCustomerFactory", function($http, $q) {

    // public API.
    return({
        // vendor operations
        getAllCustomers: getAllCustomers,
        addCustomer: addCustomer,
        getCustomer: getCustomer,
        updateCustomer: updateCustomer,
        deleteCustomer: deleteCustomer,

        // vendor contacts operations
        getAllCustomerContacts: getAllCustomerContacts,
        addCustomerContact: addCustomerContact,
        updateCustomerContact: updateCustomerContact,
        deleteCustomerContact: deleteCustomerContact
    });

    //********************************************************************
    // get all customers
    //********************************************************************
    function getAllCustomers() {
        var deferred = $q.defer();

        $http.get('customers')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting all customers');
            });

        return deferred.promise;
    }

    //********************************************************************
    // get a single Customer
    //********************************************************************
    function getCustomer(customerId) {
        var deferred = $q.defer();

        $http.get('customers/' + customerId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add customer
    //********************************************************************
    function addCustomer(customer) {
        var deferred = $q.defer();

        $http.post('customers', customer)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update customer
    //********************************************************************
    function updateCustomer(customer) {
        var deferred = $q.defer();

        $http.put('customers/' + customer.customer_id, customer)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating customer');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete customer
    //********************************************************************
    function deleteCustomer(customerContactId) {

        var deferred = $q.defer();

        $http.delete('customers/' + customerContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting customer');
            });

        return deferred.promise;
    }




    //********************************************************************
    // get customer contacts
    //********************************************************************
    function getAllCustomerContacts(customerId) {

        var deferred = $q.defer();

        $http.get('customer-contacts/' + customerId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error getting customer contacts');
            });

        return deferred.promise;
    }

    //********************************************************************
    // add customer contact
    //********************************************************************
    function addCustomerContact(contact) {
        var deferred = $q.defer();

        $http.post('customer-contacts', contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error adding customer contact');
            });

        return deferred.promise;
    }

    //********************************************************************
    // update customer contact
    //********************************************************************
    function updateCustomerContact(contact) {
        var deferred = $q.defer();

        $http.put('customer-contacts/' + contact.customer_contact_id, contact)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error updating customer contact');
            });

        return deferred.promise;
    }

    //********************************************************************
    // delete customer contact
    //********************************************************************
    function deleteCustomerContact(customerContactId) {

        var deferred = $q.defer();

        $http.delete('customer-contacts/' + customerContactId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error( function() {
                deferred.reject('Error deleting customer contact');
            });

        return deferred.promise;
    }
});