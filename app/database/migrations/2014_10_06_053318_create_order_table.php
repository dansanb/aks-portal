<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order', function(Blueprint $table)
		{
			$table->integer('order_id', true);
			$table->integer('customer_id')->nullable();
			$table->integer('order_number')->nullable();
			$table->dateTime('order_date')->nullable();
			$table->dateTime('required_date')->nullable();
			$table->dateTime('delivered_date')->nullable();
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
		Schema::drop('order');
	}

}
