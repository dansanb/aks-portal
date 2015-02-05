<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCustomersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('customers', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('business_name');
            $table->string('address_street');
            $table->string('address_unit');
            $table->string('address_city');
            $table->string('address_state');
            $table->string('address_zip');
            $table->string('address_country');
            $table->string('notes');
            $table->boolean('di_customer');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('customers');
	}

}
