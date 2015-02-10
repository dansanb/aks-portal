<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// routes that don't require authentication
Route::get('/', 'HomeController@index');
Route::post('users/login', 'UsersController@login');

// routes that require authentication
Route::group(array('before' => 'auth'), function()
{
    // user routes
    Route::post('users/logout', 'UsersController@logout');
    Route::put('user-change-password/{userId}', 'UsersController@changePassword');
    Route::Resource('users', 'UsersController');

    // purchase order routes
    Route::Resource('purchase-orders', 'PurchaseOrdersController');

    // sales order routes
    Route::get('sale-orders-lite', 'SaleOrdersController@getAllSaleOrdersLite');
    Route::Resource('sale-orders', 'SaleOrdersController');


    // vendor routes
    Route::get('vendors-lite', 'VendorsController@getAllVendorsLite');
    Route::Resource('vendors', 'VendorsController');

    // vendor contacts
    Route::get('vendor-contacts/{vendorId}', 'VendorContactsController@index');
    Route::get('vendor-contacts-single/{vendorId}', 'VendorContactsController@show');
    Route::delete('vendor-contacts/{vendorId}', 'VendorContactsController@destroy');
    Route::put('vendor-contacts/{contactId}', 'VendorContactsController@update');
    Route::post('vendor-contacts', 'VendorContactsController@store');


    // customer routes
    Route::get('customers-lite', 'CustomersController@getAllCustomersLite');
    Route::Resource('customers', 'CustomersController');

    // customer contacts
    Route::get('customer-contacts/{customerId}', 'CustomerContactsController@index');
    Route::get('customer-contacts-single/{customerId}', 'CustomerContactsController@show');
    Route::delete('customer-contacts/{customerId}', 'CustomerContactsController@destroy');
    Route::put('customer-contacts/{customerId}', 'CustomerContactsController@update');
    Route::post('customer-contacts', 'CustomerContactsController@store');
});