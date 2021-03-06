<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVendorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vendor', function(Blueprint $table)
		{
			$table->integer('vendor_id', true);
			$table->string('company_name', 45)->nullable();
			$table->string('ship_address', 100)->nullable();
			$table->string('bill_address', 100)->nullable();
			$table->string('phone', 30)->nullable();
			$table->string('fax', 30)->nullable();
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
		Schema::drop('vendor');
	}

}
