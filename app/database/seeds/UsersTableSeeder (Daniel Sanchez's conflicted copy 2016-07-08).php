<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;
use Illuminate\Hashing;


class UsersTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

        User::create([
            'email' => 'daniel@aquaklean.com',
            'password' => Hash::make('1'),
            'display_name' => 'Daniel'
        ]);


        User::create([
            'email' => 'shane@aquaklean.com',
            'password' => Hash::make('1'),
            'display_name' => 'Shane'
        ]);

	}

}