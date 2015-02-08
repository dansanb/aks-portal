<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePurchaseOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('purchase_order', function(Blueprint $table)
		{
			$table->integer('purchase_order_id', true);
			$table->integer('vendor_id');
			$table->integer('sales_order_id');
			$table->integer('user_id');
			$table->dateTime('date_ordered');
			$table->dateTime('date_required')->nullable();
			$table->dateTime('date_delivered')->nullable();
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
		Schema::drop('purchase_order');
	}

}
