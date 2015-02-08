<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTriggerGeneratePurchaseOrder extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		/*
		$sql = "
		CREATE TRIGGER generatePurchaseOrder BEFORE INSERT ON purchase_orders
		FOR EACH ROW
		BEGIN
			DECLARE nextPurchaseOrder INT;
			SELECT MAX(po_number) INTO nextPurchaseOrder FROM purchase_orders;
			IF (nextPurchaseOrder IS NULL) THEN
				SET NEW.po_number = 2000;
			ELSE
				SET NEW.po_number = nextPurchaseOrder + 1;
			END IF;
		END;
		";

		DB::unprepared($sql);
		*/
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		// DB::unprepared('DROP TRIGGER IF EXISTS generatePurchaseOrder');
	}

}
