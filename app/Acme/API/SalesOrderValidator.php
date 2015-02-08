<?php namespace Acme\API;




class SalesOrderValidator extends APIValidator {

    /**
     * Rules for sales order model
     * @var array
     */
    protected $rules = [
        'customer_id'  => 'required',
        'user_id'  => 'required',
        'date_ordered' => 'required',
        'short_description' => 'required'
    ];

}