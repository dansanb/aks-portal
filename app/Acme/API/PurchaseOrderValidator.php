<?php namespace Acme\API;




class PurchaseOrderValidator extends APIValidator {

    /**
     * Rules for purchase order model
     * @var array
     */
    protected $rules = [
        'vendor_id'  => 'required',
        'customer_id'  => 'required',
        'user_id'  => 'required',
        'po_date' => 'required'
    ];

}