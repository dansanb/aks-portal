<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetAutoincrementStartingValueInPurchaseOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        // don't run this command if in testing - sqlite throws errors
        if (App()->environment() === "testing")
        {
            return;
        }
		$statement = "
                        ALTER TABLE purchase_order AUTO_INCREMENT = 1000;
                    ";

		DB::unprepared($statement);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
