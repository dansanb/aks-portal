<?php


/**
 * Tests Vendor Contacts Model Requests
 */
class ApiVendorContactsTest extends TestCase {


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
    public function get_all_vendor_contacts()
    {
        $request = $this->call('GET', 'vendor-contacts/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertNotEmpty($response->data);
    }

    /**
     * Test valid single get request
     *
     * - $response->success should be true
     * - $response->data->vendor_contact_id should equal 1
     *
     * @test
     */
    public function get_vendor_contact()
    {
        $request = $this->call('GET', 'vendor-contacts-single/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(1, $response->data->vendor_contact_id);
    }


    /**
     * Test get request of record that doesn't exist
     *
     * - should throw ModelNotFoundException
     *
     * @test
     */
    public function get_vendor_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');
        $request = $this->call('GET', 'vendor-contacts-single/x');
    }

    /**
     * Test a post request (create/store) with valid data
     *
     * - $response->success should return true
     * - $response->data->id should be the ID of the record created
     *
     * @test
     */
    public function create_vendor_contact()
    {
        $json = '{
                "vendor_id":"1",
                "first_name":"foo"
                }';

        $request = $this->call('POST', 'vendor-contacts', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertInternalType("int", $response->data->vendor_contact_id);
    }

    /**
     * Test a post request (create/store) with invalid data, should throw exception
     *
     * - should throw APIValidationException
     *
     * @test
     */
    public function create_vendor_contact_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        // leave out required field
        $json = '{
                "vendor_id":"1"
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
    public function update_vendor_contact()
    {
        $json = '{
                "vendor_id":"1",
                "first_name":"Bar",
                "last_name":"Foo"
                }';


        $request = $this->call('PUT', 'vendor-contacts/1', array(), array(), array(), $json );
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
    public function update_vendor_contact_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "vendor_id":"1",
                "first_name":""
                }';

        $request = $this->call('PUT', 'vendor-contacts/1', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) on a record that doesn't exist
     *
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function update_vendor_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $json = '{
                "first_name":"foo"
                }';

        $request = $this->call('PUT', 'vendor-contacts/x', array(), array(), array(), $json);
    }

    /**
     * Deletes a record
     *
     *  - should expect true from response
     *
     * @test
     */
    public function delete_vendor_contact()
    {
        $request = $this->call('DELETE', 'vendor-contacts/1');
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
    public function delete_vendor_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $request = $this->call('DELETE', 'vendor-contacts/x');
    }

}