<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            '_id' => $this->id,
            'firstName' => ucfirst($this->firstName),
            'lastName' => ucfirst($this->lastName),
            'cardNumber' => $this->cardNumber,
            'expiryDate' => $this->expiryDate,
            'cVV' => $this->CVV
        ];

    }
}
