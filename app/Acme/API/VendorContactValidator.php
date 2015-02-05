<?php namespace Acme\API;




class VendorContactValidator extends APIValidator {

    /**
     * Rules for vendor contact model
     * @var array
     */
    protected $rules = [
        'vendor_id'  => 'required',
        'first_name'  => 'required'
    ];

}