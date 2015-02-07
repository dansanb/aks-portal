<?php

class PurchaseOrder extends \Eloquent
{
    protected $table = "purchase_orders";
    protected $primaryKey = 'po_id';
    protected $fillable = [
        'po_number',
        'vendor_id',
        'customer_id',
        'user_id',
        'po_date',
        'required_date',
        'received_date',
        'short_description',
        'notes'
    ];

    function customer() {
        return $this->hasOne('Customer');
    }

    function vendor() {
        return $this->hasOne('Vendor');
    }

    function user() {
        return $this->hasOne('User');
    }
}