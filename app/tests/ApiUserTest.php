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
                "email":"foo@bar.com",
                "display_name":"Foo_Bar",
                "password":"some-password"
                }';

        $request = $this->call('POST', 'users', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
        $this->assertEquals(2, $response->data->id);
    }


    /**
     * Test a post request (create/store) with invalid data, should throw exception
     *
     * @test
     */
    public function create_user_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "email":"foo@bar.com",
                "display_name":"",
                "password":"some-password"
                }';

        $request = $this->call('POST', 'users', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) with valid data
     *
     *  - $response->success should return true
     *
     * @test
     */
    public function update_user()
    {
        $json = '{
                "email":"foo2@bar2.com",
                "display_name":"Foo2_Bar2",
                "old_password":"",
                "new_password":"",
                "confirm_password":""
                }';


        $request = $this->call('PUT', 'users/1', array(), array(), array(), $json );
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
    public function update_user_with_invalid_data()
    {
        $this->setExpectedException('\Acme\API\APIValidationException');

        $json = '{
                "email":"invalid-email",
                "display_name":""
                }';

        $request = $this->call('PUT', 'vendors/1', array(), array(), array(), $json);
    }

    /**
     * Test a put request (update) with valid data and password
     *
     *  - $response->success should return true
     *
     * @test
     */
    public function update_user_with_password()
    {
        $json = '{
                "email":"foo2@bar2.com",
                "display_name":"Foo2_Bar2",
                "old_password":"1",
                "new_password":"new-pass",
                "confirm_password":"new-pass"
                }';


        $request = $this->call('PUT', 'users/1', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(true, $response->success);
    }

    /**
     * Test a put request (update) with invalid password
     *
     *  - $response->success should return false
     *
     * @test
     */
    public function update_user_with_invalid_password()
    {
        $json = '{
                "email":"foo2@bar2.com",
                "display_name":"Foo2_Bar2",
                "old_password":"invalid-password",
                "new_password":"new-pass",
                "confirm_password":"new-pass"
                }';


        $request = $this->call('PUT', 'users/1', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(false, $response->success);
    }

    /**
     * Test a put request (update) with password but un-matching new passwords
     *
     *  - $response->success should return false
     *
     * @test
     */
    public function update_user_with_unmatching_new_passwords()
    {
        $json = '{
                "email":"foo2@bar2.com",
                "display_name":"Foo2_Bar2",
                "old_password":"1",
                "new_password":"new-password",
                "confirm_password":"newpasswurd"
                }';

        $request = $this->call('PUT', 'users/1', array(), array(), array(), $json );
        $response = json_decode($request->getContent());

        $this->assertEquals(false, $response->success);
    }




}