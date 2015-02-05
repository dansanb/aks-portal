<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('po', function(Blueprint $table)
		{
			$table->integer('po_id', true);
			$table->integer('vendor_id')->nullable();
			$table->integer('customer_id')->nullable();
			$table->integer('employee_id')->nullable();
			$table->dateTime('po_date')->nullable();
			$table->dateTime('required_date')->nullable();
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
		Schema::drop('po');
	}

}
