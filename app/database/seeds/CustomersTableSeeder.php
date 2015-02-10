<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CustomersTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 50) as $index)
        {
            Customer::create([
                'company_name' => 'Customer-' . $faker->firstName,
                'ship_address' => $faker->address,
                'bill_address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'fax' => $faker->phoneNumber,
                'notes' => $faker->text
            ]);
        }
    }
}