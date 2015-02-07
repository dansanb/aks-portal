<?php

class Customer extends \Eloquent
{
    protected $table = "customers";
    protected $primaryKey = 'customer_id';
    protected $fillable = [
        'company_name',
        'bill_address',
        'ship_address',
        'phone',
        'fax',
        'notes'
    ];

    function customerContacts() {
        return $this->hasMany('CustomerContact');
    }
}