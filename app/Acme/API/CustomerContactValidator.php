<?php namespace Acme\API;




class CustomerContactValidator extends APIValidator {

    /**
     * Rules for vendor contact model
     * @var array
     */
    protected $rules = [
        'customer_id'  => 'required',
        'first_name'  => 'required'
    ];

}