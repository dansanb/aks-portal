<?php


/**
 * Tests Vendor Model Requests
 */
class ApiVendorTest extends TestCase {


    /**
     * Test Setup - Called before each test
     */
    public function setUp()
    {
        parent::setUp();
        Artisan::call('migrate');
        Artisan::call('db:seed');
    }


    /**
     * Test valid get all request
     *
     * - $response->success should be true
     * - $response->data should not be empty
     *
     * @test
     */
    public function get_all_vendors()
    {
        $request = $this->call('GET', 'vendors');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertNotEmpty($response->data);
    }

    /**
     * Test valid get all request (lite list - only name and id)
     *
     * - $response->success should be true
     * - $response->data should not be empty
     *
     * @test
     */
    public function get_all_vendors_lite()
    {
        $request = $this->call('GET', 'vendors-lite');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertNotEmpty($response->data);
    }


    /**
     * Test valid single get request
     *
     * - $response->success should be true
     * - $response->data->vendor_id should equal 1
     *
     * @test
     */
    public function get_vendor()
    {
        $request = $this->call('GET', 'vendors/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(1, $response->data->vendor_id);
    }


    /**
     * Test get request of record that doesn't exist
     *
     * - should throw ModelNotFoundException
     *
     * @test
     */
    public function get_vendor_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');
        $request = $this->call('GET', 'vendors/x');
    }


    /**
     * Test a post request (create/store) with valid data
     *
     * - $response->success should return true
     * - $response->data->id should be the ID of the record created
     *
     * @test
     */
    public function create_vendor()
    {
        $json = '{
                "company_name":"Microsoft"
                }';

        $request = $this->call('POST', 'vendors', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertInternalType("int", $response->data->vendor_id);
    }


    /**
     * Test a post request (create/store) with invalid data, should throw exception
     *
     * - should throw APIValidationException
     *
     * @test
     */
    public function create_vendor_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "company_name":""
                }';

        $request = $this->call('POST', 'vendors', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) with valid data
     *
     *  - $response->success should return true
     *
     * @test
     */
    public function update_vendor()
    {
        $json = '{
                "company_name":"Microsoft",
                "ship_address":"1 Redmond Ave",
                "bill_address":"1 Redmond Ave",
                "phone":"(714) 475-4521",
                "fax":"(714) 475-4521",
                "notes":"These are some sample notes"
                }';


        $request = $this->call('PUT', 'vendors/1', array(), array(), array(), $json );
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
    public function update_vendor_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "company_name":"",
                "ship_address":"1 Redmond Ave",
                "bill_address":"1 Redmond Ave",
                "phone":"(714) 475-4521",
                "fax":"(714) 475-4521",
                "notes":"These are some sample notes"
                }';

        $request = $this->call('PUT', 'vendors/1', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) on a record that doesn't exist
     *
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function update_vendor_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $json = '{
                "company_name":"Microsoft"
                }';

        $request = $this->call('PUT', 'vendors/x', array(), array(), array(), $json);
    }

    /**
     * Deletes a record
     *
     *  - should expect true from response
     *
     * @test
     */
    public function delete_vendor()
    {
        $request = $this->call('DELETE', 'vendors/1');
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
    public function delete_vendor_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $request = $this->call('DELETE', 'vendors/x');
    }

}