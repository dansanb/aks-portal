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
            'password' => Hash::Make('1'),
			'display_name' => 'Daniel Da Man'
        ]);

		User::create([
			'email' => 'rachel@aquaklean.com',
			'password' => Hash::Make('2'),
			'display_name' => 'Baby Rachel'
        ]);

	}

}