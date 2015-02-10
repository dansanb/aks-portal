<?php namespace Acme\API;




class SalesOrderValidator extends APIValidator {

    /**
     * Rules for sales order model
     * @var array
     */
    protected $rules = [
        'date_ordered' => 'required',
        'customer_id' => 'required',
        'user_id' => 'required'
    ];

}