<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PurchaseOrderTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 20) as $index)
        {
            PurchaseOrder::create([
                'vendor_id' => $faker->numberBetween(1, 20),
                'sales_order_id' => $faker->numberBetween(1, 20),
                'user_id' => 1,
                'date_ordered' => $faker->date,
                'date_required' => $faker->date,
                'date_delivered' => $faker->date,
                'short_description' => $faker->text,
                'notes' => $faker->text
            ]);

        }

    }

}