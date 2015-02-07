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
     * Dependency-Inject the validator
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

        // return newly created record
        return $this->successfulResponse($user);
	}

	/**
	 * Retrieve the specified user.
	 *
	 * @param  int  $id
	 * @return string json response with the requested user record
     * @throws ModelNotFoundException
	 */
	public function show($id)
	{
        $user = User::findOrFail($id);

        return $this->successfulResponse($user);
	}


	/**
	 * Update the specified user in storage
	 *
	 * @param  int  $id - id of the user to be updated
	 * @return string json response containing 'success' to notify if user was updated (true/false).
     */
	public function update($id)
	{

        $data = Input::json()->all();
        $user = User::findOrFail($id);

        // validate all non-password fields
        $this->validator->validate($data);

        // keep password fields, remove them from
        // the data array, and fill all non-password fields
        $currentPassword = $data['current_password'];
        $newPassword = $data['new_password'];
        $confirmPassword = $data['confirm_password'];

        unset($data['current_password']);
        unset($data['new_password']);
        unset($data['confirm_password']);

        $user->fill($data);


        // check if user wants to change password, and
        if (empty($currentPassword)) {
            // $currentPassword is empty, user did not want to change password
            $user->save();
            return $this->successfulResponse($user);
        }

        // user wants to change password - check if passwords match
        if (Hash::check($currentPassword, Auth::user()->password)) {
            // old passwords match, check if new password and password confirmation match
            if ($newPassword === $confirmPassword) {
                $user->password = Hash::make($newPassword);
                $user->save();
                return $this->successfulResponse($user);
            }
            else {
                return $this->failedResponse('The new passwords do not match.');
            }
        }
        else {
            return $this->failedResponse('The password provided is not the current password.');
        }

	}



    /**
     * Update the specified user's password
     *
     * @param  int  $id - id of the user to be updated
     * @return string json response containing 'success' to notify if user was updated (true/false).
     */
    public function changePassword($id)
    {

        $data = Input::json()->all();
        $user = User::findOrFail($id);

        // get data as variables
        $currentPassword = $data['current_password'];
        $newPassword = $data['new_password'];
        $confirmPassword = $data['confirm_password'];

        // check if passwords match
        if (Hash::check($currentPassword, Auth::user()->password)) {
            // old passwords match, check if new password and password confirmation match
            if ($newPassword === $confirmPassword) {
                $user->password = Hash::make($newPassword);
                $user->save();
                return $this->successfulResponse($user);
            }
            else {
                return $this->failedResponse('The new passwords do not match.');
            }
        }
        else {
            return $this->failedResponse('The password provided is not the current password.');
        }

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
        $email = Input::get('email');
        $password = Input::get('password');

        // try to login user
        if (Auth::attempt(array('email' => $email, 'password' => $password), true)) {

            // if successful, return user id and display name
            $user = array(
                'id' => Auth::user()->id,
                'display_name' => Auth::user()->display_name);

            return $this->successfulResponse($user);
        }
        else {
            // return failure response
            return $this->failedResponse('Could not validate your credentials');
        }
    }

    /*
     * Logs the user out
     *
     * @return string json response
     */
    public function logout()
    {
        Auth::logout();

        return $this->successfulResponse();
    }

}
