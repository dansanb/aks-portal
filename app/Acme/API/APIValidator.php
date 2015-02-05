<?php namespace Acme\API;

use Illuminate\Validation\Factory as Validator;

/**
 * Provides validation to API store / update requests.
 * @package Acme\API
 */
abstract class APIValidator {

    /**
     * @var Validator
     */
    protected $validator;
    /**
     * @var validation
     */
    protected $validation;

    /**
     * @param Validator $validator
     */
    function __construct(Validator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * @param   array   $formData       Array of fields to validate
     * @return  bool                    True if $formData passes validation
     * @throws  APIValidationException  If $formData did not pass validation
     */
    public function validate(array $formData)
    {
        $this->validation = $this->validator->make($formData, $this->getValidationRules());

        if ($this->validation->fails())
        {
            throw new APIValidationException('Validation Failed', $this->getValidationErrors());
        }

        return true;
    }

    /**
     * Returns the validation rules
     * @return mixed
     */
    protected function getValidationRules()
    {
        return $this->rules;
    }

    /**
     * Returns the validation errors
     * @return mixed
     */
    protected function getValidationErrors()
    {
        return $this->validation->errors();
    }

}