<?php

class Vendor extends \Eloquent
{
    protected $table = "vendor";
    protected $primaryKey = 'vendor_id';
    protected $fillable = [
        'company_name',
        'bill_address',
        'ship_address',
        'phone',
        'fax',
        'notes'
    ];

    function vendorContacts() {
        return $this->hasMany('VendorContact');
    }


}