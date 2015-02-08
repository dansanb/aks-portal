<?php

class SalesOrder extends \Eloquent
{
    protected $table = "sales_order";
    protected $primaryKey = 'sales_order_id';
    protected $fillable = [
        'customer_id',
        'users_id',
        'ship_address',
        'phone',
        'fax',
        'description'
    ];

    /*
    function customerContacts() {
        return $this->hasMany('CustomerContact');
    }
    */
}