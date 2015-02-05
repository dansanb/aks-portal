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
        'password'  => 'required|min:8',
        'email'     => 'required|email'
    ];
}