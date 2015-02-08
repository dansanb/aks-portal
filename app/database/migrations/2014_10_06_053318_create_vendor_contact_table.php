<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVendorContactTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vendor_contact', function(Blueprint $table)
		{
			$table->integer('vendor_contact_id', true);
			$table->integer('vendor_id')->nullable();
			$table->string('first_name', 45)->nullable();
			$table->string('last_name', 45)->nullable();
			$table->string('title', 45)->nullable();
			$table->string('phone', 30)->nullable();
			$table->string('fax', 30)->nullable();
			$table->string('email', 45)->nullable();
			$table->string('notes')->nullable();
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
		Schema::drop('vendor_contact');
	}

}
