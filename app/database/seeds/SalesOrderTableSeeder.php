<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class SalesOrderTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 20) as $index)
        {
            SalesOrder::create([
                'customer_id' => $faker->numberBetween(1, 50),
                'user_id' => 1,
                'date_ordered' => $faker->date,
                'short_description' => $faker->text,
                'notes' => $faker->text
            ]);

        }

    }

}