<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CustomerContactsTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 40) as $index)
        {
            for($i=0; $i < 3; $i++) {
                CustomerContact::create([
                    'customer_id' => $index,
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'phone' => $faker->phoneNumber,
                    'email' => $faker->email
                ]);
            }
        }
    }

}