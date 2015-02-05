<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePoDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('po_details', function(Blueprint $table)
		{
			$table->integer('po_id')->nullable();
			$table->string('product_name')->nullable();
			$table->float('unit_price', 10, 0)->nullable();
			$table->float('quantity', 10, 0)->nullable();
			$table->float('discount', 10, 0)->nullable();
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
		Schema::drop('po_details');
	}

}
