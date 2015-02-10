<?php

class SalesOrder extends \Eloquent
{
    protected $table = "sales_order";
    protected $primaryKey = 'sales_order_id';
    protected $fillable = [
        'customer_id',
        'user_id',
        'date_ordered',
        'date_required',
        'date_delivered',
        'short_description',
        'notes'
    ];

    public function user() {
        return $this->hasOne('User');
    }

    public function customer() {
        return $this->belongsTo('Customer');
    }

}