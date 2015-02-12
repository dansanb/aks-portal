<?php


/**
 * Tests purchase order Model Requests
 *
 * NOTE: for testing, purchase order id numbers start at 1
 *
 */
class ApiPurchaseOrderTest extends TestCase {


    /**
     * Test Setup - Called before each test
     */
    public function setUp()
    {
        parent::setUp();
        Artisan::call('migrate');
        Artisan::call('db:seed');

        // enable auth filter and login user id 1
        Route::enableFilters();
        Auth::loginUsingId(1);
    }

    /**
     * Test valid get all request
     *
     * - $response->success should be true
     * - $response->data should not be empty
     *
     * @test
     */
    public function get_all_purchase_orders()
    {
        $request = $this->call('GET', 'purchase-orders');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertNotEmpty($response->data);
    }

    /**
     * Test valid single get request
     *
     * - $response->success should be true
     * - $response->data->customer_id should equal 1
     *
     * @test
     */
    public function get_purchase_order()
    {
        $request = $this->call('GET', 'purchase-orders/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(1, $response->data->purchase_order_id);
    }


    /**
     * Test get request of record that doesn't exist
     *
     * - should throw ModelNotFoundException
     *
     * @test
     */
    public function get_purchase_order_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');
        $request = $this->call('GET', 'purchase-orders/x');
    }


    /**
     * Test a post request (create/store) with valid data
     *
     * - $response->success should return true
     *
     * @test
     */
    public function create_purchase_order()
    {
        $json = '{
                "vendor_id":"1",
                "sales_order_id":"1"
                }';

        $request = $this->call('POST', 'purchase-orders', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
    }


    /**
     * Test a post request (create/store) with invalid data, should throw exception
     *
     * - should throw APIValidationException
     *
     * @test
     */
    public function create_purchase_order_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        // invalid data is: missing sales_order_id
        $json = '{
                "vendor_id":"1",
                "sales_order_id":""
                }';

        $request = $this->call('POST', 'purchase-orders', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) with valid data
     *
     *  - $response->success should return true
     *
     * @test
     */
    public function update_purchase_order()
    {
        $json = '{
                "vendor_id":"3",
                "sales_order_id":"3",
                "user_id":"3",
                "date_ordered":"12/31/1999",
                "short_description":"An updated short description"
                }';


        $request = $this->call('PUT', 'purchase-orders/1', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
    }

    /**
     * Test a put request (update) with invalid data
     *
     *  - should throw APIValidationException
     *
     * @test
     */
    public function update_purchase_order_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        // invalid data is: missing vendor_id
        $json = '{
                "vendor_id":"",
                "sales_order_id":"1",
                "user_id":"1",
                "date_ordered":"12/31/1999",
                "short_description":"A simple part"
                }';

        $request = $this->call('PUT', 'purchase-orders/1', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) on a record that doesn't exist
     *
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function update_purchase_order_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $json = '{
                "vendor_id":"1",
                "sales_order_id":"1",
                "user_id":"1",
                "date_ordered":"12/31/2005",
                "short_description":"Updated short description and changed date"
                }';

        $request = $this->call('PUT', 'purchase-orders/x', array(), array(), array(), $json);
    }

    /**
     * Deletes a record
     *
     *  - should expect true from response
     *
     * @test
     */
    public function delete_purchase_order()
    {
        $request = $this->call('DELETE', 'purchase-orders/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
    }


    /**
     * Deletes a record that doesn't exist
     *
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function delete_purchase_order_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $request = $this->call('DELETE', 'purchase-orders/x');
    }

}