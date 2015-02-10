<?php

use Acme\API\CustomerValidator;

class CustomersController extends \BaseController {


    function __construct(CustomerValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * return a list of customers
     *
     * @return Response
     */
    public function index()
    {
        $data = Customer::orderBy('company_name')->get();

        return $this->successfulResponse($data);
    }

    /**
     * return a lite list of all customers (name and id only)
     *
     * @return Response
     */
    public function getAllCustomersLite()
    {
        $data = DB::table('customer')->select('customer_id',  'company_name')->orderBy('company_name', 'asc')->get();

        return $this->successfulResponse($data);
    }


    /**
     * Store a newly created customer and return it
     *
     * @return Response with new customer
     */
    public function store()
    {
        $data = Input::json()->all();
        $this->validator->validate($data);

        $customer = new Customer($data);
        $customer->save();

        return $this->successfulResponse($customer);
    }

    /**
     * retrieve the specified customer.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return $this->successfulResponse($customer);
    }

    /**
     * Update the specified customer in storage.
     *
     * @param  int  $id
     * @return Response with updated customer
     */
    public function update($id)
    {

        $data = Input::json()->all();
        $customer = Customer::findOrFail($id);

        $this->validator->validate($data);

        $customer->fill($data);
        $customer->save();

        return $this->successfulResponse($customer);
    }

    /**
     * Remove the specified customer from storage, and
     * all associated customer contacts
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // get customer
        $customer = Customer::findOrFail($id);

        // destroy it's contacts
        $customer->customerContacts()->delete();

        // delete customer
        $customer->delete();

        return $this->successfulResponse();
    }

}
