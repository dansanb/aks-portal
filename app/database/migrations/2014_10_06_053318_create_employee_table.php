<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEmployeeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('employee', function(Blueprint $table)
		{
			$table->integer('employee_id', true);
			$table->string('first_name', 45)->nullable();
			$table->string('last_name', 45)->nullable();
			$table->string('title', 45)->nullable();
			$table->dateTime('birth_date')->nullable();
			$table->dateTime('hire_date')->nullable();
			$table->string('address')->nullable();
			$table->string('phone', 30)->nullable();
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
		Schema::drop('employee');
	}

}
