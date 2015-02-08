<?php namespace Acme\API;




class PurchaseOrderValidator extends APIValidator {

    /**
     * Rules for purchase order model
     * @var array
     */
    protected $rules = [
        'vendor_id'  => 'required',
        'sales_order_id'  => 'required',
        'user_id'  => 'required',
        'date_ordered' => 'required',
        'short_description' => 'required'
    ];

}