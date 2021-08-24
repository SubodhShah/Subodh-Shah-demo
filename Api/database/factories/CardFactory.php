<?php

namespace Database\Factories;

use App\Models\Card;
use Illuminate\Database\Eloquent\Factories\Factory;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'cardNumber' => $this->faker->randomElement(['123-123-123-123','111-111-111-111','222-222-222-222','900-911-312-123','123-000-100-123']),
            'expiryDate' => '2021-08-24',
            'CVV' => $this->faker->randomElement(['123','321','111','343','356','121']),
        ];
    }
}
