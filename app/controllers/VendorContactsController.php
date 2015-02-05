<?php

use Acme\API\VendorContactValidator;

class VendorContactsController extends \BaseController {

    function __construct(VendorContactValidator $validator)
    {
        $this->validator = $validator;
    }


	/**
	 * Returns a list of contacts for a given vendor
     * GET /vendor-contacts
	 *
	 * @return Response
	 */
	public function index($vendorId)
	{
        $data = VendorContact::where('vendor_id', '=', $vendorId)->get();

        return $this->successfulResponse($data);
	}


	/**
	 * Store a newly created contact and return it
     * PUT /vendor-contacts
	 *
	 * @return Response with new contact
	 */
	public function store()
	{
        $data = Input::json()->all();
        $this->validator->validate($data);

        $contact = new VendorContact($data);
        $contact->save();

        return $this->successfulResponse($contact);
	}

	/**
	 * Display the specified resource.
	 * GET /vendor-contacts-single/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        $contact = VendorContact::findOrFail($id);

        return $this->successfulResponse($contact);
	}


	/**
	 * Update the specified resource in storage.
	 * PUT /vendor-contacts/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        $data = Input::json()->all();
        $contact = VendorContact::findOrFail($id);

        $this->validator->validate($data);

        $contact->fill($data);
        $contact->save();

        return $this->successfulResponse($contact);
    }


	/**
	 * Remove the specified resource from storage.
	 * DELETE /vendor-contacts/{id}
	 *
	 * @param  int  $vendorContactID
	 * @return Response
	 */
	public function destroy($vendorContactID)
	{
        // get vendor
        $contact = VendorContact::findOrFail($vendorContactID);

        // delete vendor
        $contact->delete();

        return $this->successfulResponse();
	}

}