<?php

class CustomerContactsController extends \BaseController {

    /**
     * Display a listing of the resource.
     * GET /customercontacts
     *
     * @return Response
     */
    public function index($customerId)
    {
        $customerContacts = CustomerContact::where('customer_id', '=', $customerId)->get();

        return Response::json($customerContacts);
    }

    /**
     * Show the form for creating a new resource.
     * GET /vendorcontacts/create
     *
     * @return Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     * POST /vendorcontacts
     *
     * @return Response
     */
    public function store()
    {
        $data = Input::json()->all();
        $contact = new CustomerContact ($data);
        $contact->save();
    }

    /**
     * Display the specified resource.
     * GET /vendorcontacts/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * GET /vendorcontacts/{id}/edit
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * PUT /vendorcontacts/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $data = Input::json()->all();
        $contact = CustomerContact::find($id);
        $contact->fill($data);
        $contact->save();
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /vendorcontacts/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($customerContactId)
    {
        $customerContact = CustomerContact::find($customerContactId);
        $success = false;
        if ($customerContact) {
            $customerContact->delete();
            $success = true;
        }

        return Response::json($success);
    }

}