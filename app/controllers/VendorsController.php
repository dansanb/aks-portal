<?php

use Acme\API\VendorValidator;

class VendorsController extends \BaseController {


    function __construct(VendorValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
	 * return a list of vendors
	 *
	 * @return Response
	 */
	public function index()
	{
		$data = Vendor::orderBy('company_name')->get();

        return $this->successfulResponse($data);
	}

    /**
     * return a lite list of all vendors(name and id only)
     *
     * @return Response
     */
    public function getAllVendorsLite()
    {
        $data = DB::table('vendor')->select('id',  'company_name')->get();

        return $this->successfulResponse($data);
    }


	/**
	 * Store a newly created vendor and return it
	 *
	 * @return Response with new vendor
	 */
    public function store()
    {
        $data = Input::json()->all();
        $this->validator->validate($data);

        $vendor = new Vendor($data);
        $vendor->save();

        return $this->successfulResponse($vendor);
    }

	/**
	 * retrieve the specified vendor.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$vendor = Vendor::findOrFail($id);

        return $this->successfulResponse($vendor);
	}

	/**
	 * Update the specified vendor in storage.
	 *
	 * @param  int  $id
	 * @return Response with updated vendor
	 */
	public function update($id)
	{

        $data = Input::json()->all();
        $vendor = Vendor::findOrFail($id);

        $this->validator->validate($data);

        $vendor->fill($data);
        $vendor->save();

        return $this->successfulResponse($vendor);
	}

	/**
	 * Remove the specified vendor from storage, and
	 * all associated vendor contacts
     *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        // get vendor
        $vendor = Vendor::findOrFail($id);

        // destroy it's contacts
        $vendor->vendorContacts()->delete();

        // delete vendor
        $vendor->delete();

        return $this->successfulResponse();
	}

}
