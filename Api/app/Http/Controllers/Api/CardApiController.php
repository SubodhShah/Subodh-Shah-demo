<?php

namespace App\Http\Controllers\Api;

use App\Models\Card;
use App\Http\Controllers\Controller;
use App\Http\Requests\CardApiRequest;
use App\Http\Resources\CardResource;

class CardApiController extends Controller
{
    public function index()
    {
        return CardResource::collection(Card::all())->all();
    }

    public function store(CardApiRequest $request)
    {
        Card::create($request->validated());

        return response()->json([
            'message' => 'Credit Card Info Added Successfully',
            'success' => true
        ], 201);
    }

    public function show(Card $card)
    {
        return response()->json(new CardResource($card));
    }

    public function update(CardApiRequest $request, Card $card)
    {
        $card->update($request->validated());

        return response()->json([
            'message' => 'Credit Card Info Updated Successfully',
            'success' => true
        ], 200);
    }

    public function destroy(Card $card)
    {
        $card->delete();

        return response()->json([
            'message' => 'Credit Card Info Deleted Successfully',
            'success' => true
        ], 200);

    }
}
