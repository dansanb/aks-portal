<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UsersTableSeeder');
        $this->call('VendorsTableSeeder');
        $this->call('VendorContactsTableSeeder');

        $this->call('CustomersTableSeeder');
        $this->call('CustomerContactsTableSeeder');

		$this->call("PurchaseOrderTableSeeder");
        $this->call("SalesOrderTableSeeder");
	}

}
