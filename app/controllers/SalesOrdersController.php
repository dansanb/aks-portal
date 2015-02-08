<?php

use Acme\API\SalesOrderValidator;

class SalesOrdersController extends \BaseController {


    function __construct(SalesOrderValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * return a list of sales orders
     *
     * @return Response
     */
    public function index()
    {
        $data = SalesOrder::orderBy('sales_order_id')->get();

        return $this->successfulResponse($data);
    }

    /**
     * Store a newly created sales order and return it
     *
     * @return Response with new sales order
     */
    public function store()
    {
        $data = Input::json()->all();
        $this->validator->validate($data);

        $salesOrder = new SalesOrder($data);
        $salesOrder->save();

        return $this->successfulResponse($salesOrder);
    }

    /**
     * retrieve the specified sales order.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $salesOrder = SalesOrder::findOrFail($id);

        return $this->successfulResponse($salesOrder);
    }

    /**
     * Update the specified sales order in storage.
     *
     * @param  int  $id
     * @return Response with updated sales order
     */
    public function update($id)
    {

        $data = Input::json()->all();
        $salesOrder = SalesOrder::findOrFail($id);

        $this->validator->validate($data);

        $salesOrder->fill($data);
        $salesOrder->save();

        return $this->successfulResponse($salesOrder);
    }

    /**
     * Remove the specified sales order from storage
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // get sales order
        $salesOrder = SalesOrder::findOrFail($id);

        // delete customer
        $salesOrder->delete();

        return $this->successfulResponse();
    }

}
