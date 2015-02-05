<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

    /**
     * @param   array   $data   data to attach to response
     * @return mixed            returns response object
     */
    protected function successfulResponse($data = array())
    {
        // return success response
        return Response::json(
            array(
                'success' => true,
                'data' => $data
            ));
    }

}
