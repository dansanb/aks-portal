<?php


use Acme\API\UserValidator as UserValidator;


class UsersController extends \BaseController {

    /**
     * Specific validator for this model
     *
     * @var UserValidator
     */
    protected $validator;


    /**
     * Code Injection
     *
     * @param UserValidator $validator
     */
    function __construct(UserValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * Store a new record
     *
     * @return mixed
     * @throws \Acme\API\APIValidationException
     */
    public function store()
	{
        // insert new record and get a copy of it
        $data = Input::json()->all();
        $this->validator->validate($data);

        $user = new User($data);
        $user->save();

        // return id of newly created record
        return $this->successfulResponse( array('id' => $user->id) );
	}

	/**
	 * Retrieve the specified user.
	 *
	 * @param  int  $id
	 * @return string json response with the requested user record
	 */
	public function show($id)
	{
        $user = User::findOrFail($id);
        return $this->successfulResponse($user);
	}


	/**
	 * Update the specified user in storage.
	 *
	 * @param  int  $id - id of the user to be updated
	 * @return string json response containing 'success' to notify if user was updated (true/false).
     */
	public function update($id)
	{

	}

	/**
	 * Remove the specified user from storage.
	 *
	 * @param  int  $id
	 * @return string json response containing 'success' to notify if user was deleted (true/false).
	 */
	public function destroy($id)
	{


	}

    /*
     * Attempt to log user in. Returns a json response object with variable 'success'.
     * If 'success' is true, the response also contains user information.
     * if 'success' is false, the response returns error message
     *
     *  @return string json response
     */
    public function login()
    {
        $username = Input::get('username');
        $password = Input::get('password');

        // try to login user
        if (Auth::attempt(array('username' => $username, 'password' => $password), true))
        {
            $user = array(
                'id' => Auth::user()->id,
                'username' => Auth::user()->username);

            return $this->successfulResponse($user);
        }
        else
        {
            // return failure response
            return Response::json(array('success' => false, 'errors' => 'Username or password is incorrect.'));
        }
    }

    /*
     * Logs the user out
     *
     */
    public function logout()
    {
        Auth::logout();
        Log::info('user has been logged out!');
    }

}
