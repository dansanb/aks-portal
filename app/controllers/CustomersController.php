<?php

class CustomersController extends \BaseController {

    /**
     * return a list of customers
     *
     * @return Response
     */
    public function index()
    {
        $data = Customer::orderBy('company_name')->get();

        return Response::json($data);
    }


    /**
     * Store a newly created customer in storage.
     *
     * @return Response
     */
    public function store()
    {
        $data = Input::json()->all();
        $customer = new Customer($data);
        $customer->save();

        return Response::json(
            array(
                'success' => true,
                'id' => $customer->customer_id
            ));
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
        return Response::json($customer);
    }

    /**
     * Update the specified customer in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {

        $data = Input::json()->all();
        $customer = Customer::find($id);
        $customer->fill($data);
        $customer->save();

        $message = "Customer '" . $customer->company_name . "' has been updated.";

        return Response::json(
            array(
                'success' => true,
                'message' => $message
            ));
    }

    /**
     * Remove the specified customer from storage, and
     * all associated vendor contacts
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // get customer
        $customer = Customer::find($id);

        // destroy it's contacts
        $customer->customerContacts()->delete();

        // delete vendor
        $customer->delete();

        $message = "Customer has been deleted.";

        return Response::json(
            array(
                'success' => true,
                'message' => $message
            ));
    }

}
