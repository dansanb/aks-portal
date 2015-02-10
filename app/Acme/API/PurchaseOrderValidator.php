<?php namespace Acme\API;




class PurchaseOrderValidator extends APIValidator {

    /**
     * Rules for purchase order model
     * @var array
     */
    protected $rules = [
        'date_ordered' => 'required',
        'sales_order_id' => 'required',
        'vendor_id' => 'required',
        'user_id' => 'required'
    ];

}