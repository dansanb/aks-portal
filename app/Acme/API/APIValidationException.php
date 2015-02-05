<?php namespace Acme\API;

use Illuminate\Support\MessageBag;

/**
 * API Validation Exception
 * @package Acme\API
 */
class APIValidationException extends \Exception {

    /**
     * @var MessageBag
     */
    protected $errors;

    /**
     * @param string $message
     * @param MessageBag $errors
     */
    function __construct($message, MessageBag $errors)
    {
        $this->errors = $errors;

        parent::__construct($message);
    }

    /**
     * Return exception errors
     * @return MessageBag
     */
    public function getErrors()
    {
        return $this->errors;
    }


}