<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {
        return response()->json(Recipe::all());
    }

    public function show($id)
    {
        return response()->json(Recipe::findOrFail($id));
    }

    public function store(Request $request)
    {
        $recipe = Recipe::create($request->all());
        return response()->json($recipe, 201);
    }

        public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->update($request->all());
        return response()->json($recipe);
    }

    public function destroy($id)
    {
        Recipe::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function cook($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->increment('cooked_count');
        return response()->json($recipe);
    }
}
