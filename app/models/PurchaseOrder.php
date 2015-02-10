<?php

class PurchaseOrder extends \Eloquent
{
    protected $table = "purchase_order";
    protected $primaryKey = 'purchase_order_id';
    protected $fillable = [
        'vendor_id',
        'sales_order_id',
        'user_id',
        'date_ordered',
        'date_required',
        'date_delivered',
        'short_description',
        'notes'
    ];

    function vendor() {
        return $this->belongsTo('Vendor');
    }

    function user() {
        return $this->hasOne('User');
    }
}