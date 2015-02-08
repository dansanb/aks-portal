<?php

class PurchaseOrder extends \Eloquent
{
    protected $table = "purchase_order";
    protected $primaryKey = 'po_id';
    protected $fillable = [
        'vendor_id',
        'sales_order_id',
        'user_id',
        'date_ordered',
        'date_required',
        'date_received',
        'short_description',
        'notes'
    ];

    function vendor() {
        return $this->hasOne('Vendor');
    }

    function salesOrder() {
        return $this->hasOne('SalesOrder');
    }

    function user() {
        return $this->hasOne('User');
    }
}