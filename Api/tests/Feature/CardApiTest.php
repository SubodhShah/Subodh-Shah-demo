<?php

namespace Tests\Feature;

use App\Models\Card;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CardApiTest extends TestCase
{
    use RefreshDatabase;

    private $createCard;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createCard = $this->postJson('api/cards', [
            'firstName' => 'John',
            'lastName' => 'Doe',
            'cardNumber' => '123-123-123-123',
            'expiryDate' => '2021-08-24',
            'CVV' => '900',
        ]);
    }

    /** @test */
    public function card_can_be_created_via_api(): void
    {
        $response = $this->createCard;

        $response->assertStatus(201);

        $this->assertCount(1, Card::all()); //card is there in database
    }

    /** @test */
    public function card_can_be_deleted_via_api(): void
    {
        //storing card
        $this->createCard;
        $this->assertCount(1, Card::all());

        //deleting stored card
        Card::first()->delete('/api/cards/' . Card::first()->id);


        $this->assertCount(0, Card::all()); //No card is there in database
    }

    /** @test */
    public function card_can_be_updated_via_api(): void
    {
        //storing card
        $this->createCard;

        $this->assertCount(1, Card::all());

        //updating stored card
        $card = Card::first();

        $this->patchJson('/api/cards/' . $card->id, [
            'firstName' => 'Jane',
            'lastName' => 'Doe',
            'cardNumber' => '123-123-123-123',
            'expiryDate' => '2022-11-24',
            'CVV' => '789',

        ])->assertStatus(200);

        $this->assertNotEquals($card->firstName, Card::first()->firstName);
        $this->assertNotEquals($card->CVV, Card::first()->CVV);

        $this->assertCount(1, Card::all());
    }

    /** @test */
    public function single_card_can_be_viewed_via_api(): void
    {
        //storing card
        $this->createCard;

        $this->getJson('/api/cards/' . Card::first()->id)->assertStatus(200);
    }


}
