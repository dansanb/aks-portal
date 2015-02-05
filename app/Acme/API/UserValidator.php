<?php namespace Acme\API;

/**
 * Validator for User API Requests
 * @package Acme\API
 */
class UserValidator extends APIValidator {

    /**
     * Rules for user model
     * @var array
     */
    protected $rules = [
        'display_name'  => 'required',
        'email'     => 'required|email'
    ];
}