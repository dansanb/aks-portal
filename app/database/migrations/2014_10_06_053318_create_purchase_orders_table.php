<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePurchaseOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('purchase_orders', function(Blueprint $table)
		{
			$table->integer('po_id', true);
			$table->integer('po_number');
			$table->integer('vendor_id');
			$table->integer('customer_id');
			$table->integer('user_id');
			$table->dateTime('po_date');
			$table->dateTime('required_date')->nullable();
			$table->dateTime('received_date')->nullable();
			$table->string('short_description')->nullable();
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
		Schema::drop('purchase_orders');
	}

}
