<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $data['image_path'] = $path;
        }

        $recipe = Recipe::create($data);
        return response()->json($recipe, 201);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);
        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($recipe->image_path) {
                Storage::disk('public')->delete($recipe->image_path);
            }
            $path = $request->file('image')->store('images', 'public');
            $data['image_path'] = $path;
        }

        $recipe->update($data);
        return response()->json($recipe);
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        if ($recipe->image_path) {
            Storage::disk('public')->delete($recipe->image_path);
        }
        $recipe->delete();
        return response()->json(null, 204);
    }

    public function cook($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->increment('cooked_count');
        return response()->json($recipe);
    }
}
