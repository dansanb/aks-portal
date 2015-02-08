<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sales_order', function(Blueprint $table)
		{
			$table->integer('sales_order_id', true);
			$table->integer('customer_id');
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
		Schema::drop('sales_order');
	}

}
