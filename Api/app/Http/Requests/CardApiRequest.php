<?php

namespace App\Http\Requests;

class CardApiRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName' => 'string',
            'lastName' => 'string',
            'cardNumber' => 'string',
            'expiryDate' => 'string',
            'cVV' => 'string',
        ];
    }
}
