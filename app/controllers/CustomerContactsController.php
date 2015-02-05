<?php

use Acme\API\CustomerContactValidator;

class CustomerContactsController extends \BaseController {

    function __construct(CustomerContactValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * Returns a list of contacts for a given customer
     * GET /customer-contacts
     *
     * @return Response
     */
    public function index($customerId)
    {
        $data = CustomerContact::where('customer_id', '=', $customerId)->get();

        return $this->successfulResponse($data);
    }


    /**
     * Store a newly created contact and return it
     * PUT /customer-contacts
     *
     * @return Response with new contact
     */
    public function store()
    {
        $data = Input::json()->all();
        $this->validator->validate($data);

        $contact = new CustomerContact($data);
        $contact->save();

        return $this->successfulResponse($contact);
    }

    /**
     * Display the specified resource.
     * GET /customer-contacts-single/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $contact = CustomerContact::findOrFail($id);

        return $this->successfulResponse($contact);
    }


    /**
     * Update the specified resource in storage.
     * PUT /customer-contacts/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $data = Input::json()->all();
        $contact = CustomerContact::findOrFail($id);

        $this->validator->validate($data);

        $contact->fill($data);
        $contact->save();

        return $this->successfulResponse($contact);
    }


    /**
     * Remove the specified resource from storage.
     * DELETE /customer-contacts/{id}
     *
     * @param  int  $customerContactID
     * @return Response
     */
    public function destroy($customerContactID)
    {
        // get customer
        $contact = CustomerContact::findOrFail($customerContactID);

        // delete customer
        $contact->delete();

        return $this->successfulResponse();
    }

}