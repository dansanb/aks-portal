<?php

class VendorContactsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /vendorcontacts
	 *
	 * @return Response
	 */
	public function index($vendorId)
	{
        $vendorContacts = VendorContact::where('vendor_id', '=', $vendorId)->get();

        return Response::json($vendorContacts);
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
        $contact = new VendorContact ($data);
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
        $contact = VendorContact::find($id);
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
	public function destroy($vendorContactID)
	{
        $vendorContact = VendorContact::find($vendorContactID);
        $success = false;
        if ($vendorContact) {
            $vendorContact->delete();
            $success = true;
        }

        return Response::json($success);
	}

}