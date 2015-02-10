<?php

use Acme\API\SalesOrderValidator;

class SaleOrdersController extends \BaseController {


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
        //$data = SalesOrder::orderBy('sales_order_id')->with('customer')->get();
        $data = DB::table('sales_order')
                ->join('customer', 'sales_order.customer_id', '=', 'customer.customer_id')
                ->select(   'sales_order.sales_order_id', 'sales_order.date_ordered',
                            'sales_order.date_delivered', 'sales_order.date_required',
                            'customer.company_name')
                ->orderBy('sales_order.sales_order_id', 'desc')
                ->get();

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

        // inject current logged-in user
        $data['user_id'] = Auth::id();

        // inject today's date as default for 'date_ordered'
        $data['date_ordered'] = date("Y-m-d H:i:s");

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
        // multi-relationship eager loading
        // here, sales order will come with associated purchase orders. then, each purchase
        // order will come with it's associated vendor.
        //
        $salesOrder = SalesOrder::with(['purchaseOrders.vendor'])->findOrFail($id);
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
        Log::info($data);
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
