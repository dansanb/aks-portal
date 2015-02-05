<?php namespace Acme\API;




class CustomerValidator extends APIValidator {

    /**
     * Rules for vendor model
     * @var array
     */
    protected $rules = [
        'company_name'  => 'required'
    ];

}