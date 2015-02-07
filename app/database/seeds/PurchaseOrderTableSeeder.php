<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PurchaseOrderTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 40) as $index)
        {
            PurchaseOrder::create([
                'po_number' => $faker->numberBetween(1000, 1900),
                'vendor_id' => $faker->firstName,
                'customer_id' => $faker->address,
                'user_id' => 1,
                'po_date' => $faker->date,
                'required_date' => $faker->date,
                'received_date' => $faker->date,
                'short_description' => $faker->text,
                'notes' => $faker->text
            ]);

        }
    }

}