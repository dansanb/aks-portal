<?php

use Acme\API\PurchaseOrderValidator;

class PurchaseOrdersController extends \BaseController {


    function __construct(PurchaseOrderValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * return a list of purchase orders
     *
     * @return Response
     */
    public function index()
    {
        //$data = PurchaseOrder::orderBy('purchase_order_id')->get();
        $data = DB::table('purchase_order')
            ->join('vendor', 'purchase_order.vendor_id', '=', 'vendor.vendor_id')
            ->select(   'purchase_order.purchase_order_id', 'purchase_order.date_ordered',
                        'purchase_order.date_delivered', 'purchase_order.date_required',
                        'vendor.company_name')
            ->orderBy('purchase_order.purchase_order_id', 'desc')
            ->get();

        return $this->successfulResponse($data);
    }

    /**
     * Store a newly created purchase order and return it
     *
     * @return Response with new purchase order
     */
    public function store()
    {
        $data = Input::json()->all();
        $this->validator->validate($data);

        $purchaseOrder = new PurchaseOrder($data);
        $purchaseOrder->save();

        return $this->successfulResponse($purchaseOrder);
    }

    /**
     * retrieve the specified purchase order.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        return $this->successfulResponse($purchaseOrder);
    }

    /**
     * Update the specified purchase order in storage.
     *
     * @param  int  $id
     * @return Response with updated purchase order
     */
    public function update($id)
    {

        $data = Input::json()->all();
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        $this->validator->validate($data);

        $purchaseOrder->fill($data);
        $purchaseOrder->save();

        return $this->successfulResponse($purchaseOrder);
    }

    /**
     * Remove the specified purchase order from storage
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // get purchase order
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        // delete customer
        $purchaseOrder->delete();

        return $this->successfulResponse();
    }

}
