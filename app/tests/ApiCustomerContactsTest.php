<?php


/**
 * Tests Vendor Contacts Model Requests
 */
class ApiCustomerContactsTest extends TestCase {


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
    public function get_all_customer_contacts()
    {
        $request = $this->call('GET', 'customer-contacts/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertNotEmpty($response->data);
    }

    /**
     * Test valid single get request
     *
     * - $response->success should be true
     * - $response->data->customer_contact_id should equal 1
     *
     * @test
     */
    public function get_customer_contact()
    {
        $request = $this->call('GET', 'customer-contacts-single/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(1, $response->data->customer_contact_id);
    }


    /**
     * Test get request of record that doesn't exist
     *
     * - should throw ModelNotFoundException
     *
     * @test
     */
    public function get_customer_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');
        $request = $this->call('GET', 'customer-contacts-single/x');
    }

    /**
     * Test a post request (create/store) with valid data
     *
     * - $response->success should return true
     * - $response->data->id should be the ID of the record created
     *
     * @test
     */
    public function create_customer_contact()
    {
        $json = '{
                "customer_id":"1",
                "first_name":"foo"
                }';

        $request = $this->call('POST', 'customer-contacts', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertInternalType("int", $response->data->customer_contact_id);
    }

    /**
     * Test a post request (create/store) with invalid data, should throw exception
     *
     * - should throw APIValidationException
     *
     * @test
     */
    public function create_customer_contact_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        // leave out required field
        $json = '{
                "customer_id":"1"
                }';

        $request = $this->call('POST', 'customers', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) with valid data
     *
     *  - $response->success should return true
     *
     * @test
     */
    public function update_customer_contact()
    {
        $json = '{
                "customer_id":"1",
                "first_name":"Bar",
                "last_name":"Foo"
                }';


        $request = $this->call('PUT', 'customer-contacts/1', array(), array(), array(), $json );
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
    public function update_customer_contact_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "customer_id":"1",
                "first_name":""
                }';

        $request = $this->call('PUT', 'customer-contacts/1', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) on a record that doesn't exist
     *
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function update_customer_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $json = '{
                "first_name":"foo"
                }';

        $request = $this->call('PUT', 'customer-contacts/x', array(), array(), array(), $json);
    }

    /**
     * Deletes a record
     *
     *  - should expect true from response
     *
     * @test
     */
    public function delete_customer_contact()
    {
        $request = $this->call('DELETE', 'customer-contacts/1');
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
    public function delete_customer_contact_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');

        $request = $this->call('DELETE', 'customer-contacts/x');
    }

}