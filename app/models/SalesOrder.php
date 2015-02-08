<?php

class SalesOrder extends \Eloquent
{
    protected $table = "sales_order";
    protected $primaryKey = 'sales_order_id';
    protected $fillable = [
        'customer_id',
        'users_id',
        'date_ordered',
        'date_required',
        'date_received',
        'short_description',
        'notes'
    ];

    function customer() {
        return $this->hasOne('Customer');
    }

    function user() {
        return $this->hasOne('User');
    }

}