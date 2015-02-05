<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;
use Illuminate\Hashing;


class UsersTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

        User::create([
            'email' => 'd@d.com',
            'password' => Hash::make('1'),
        ]);
	}

}