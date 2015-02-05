<?php


/**
 * Tests User Model Requests
 */
class ApiUserTest extends TestCase {


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
     * Test valid single get request
     *
     * - $response->success should be true
     * - $response->data->id should equal 1
     *
     * @test
     */
    public function get_user()
    {
        $request = $this->call('GET', 'users/1');
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(1, $response->data->id);
    }


    /**
     * Test get request of record that doesn't exist
     *  - should throw ModelNotFoundException
     *
     * @test
     */
    public function get_user_that_doesnt_exist()
    {
        $this->setExpectedException('\Illuminate\Database\Eloquent\ModelNotFoundException');
        $request = $this->call('GET', 'users/x');
    }


    /**
     * Test a post request (create/store) with valid data
     *
     * - $response->success should be true
     * - $response->data->id should be 2
     *
     * @test
     */
    public function create_user()
    {
        $json = '{
                "email":"email@address.com",
                "password":"let-me-in"
                }';

        $request = $this->call('POST', 'users', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(2, $response->data->id);
    }


    /**
     * test a post request (create/store) with invalid data, should throw exception
     */
    public function test_create_user_and_fail()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "email":"",
                "password":""
                }';

        $request = $this->call('POST', 'users', array(), array(), array(), $json);
    }

}