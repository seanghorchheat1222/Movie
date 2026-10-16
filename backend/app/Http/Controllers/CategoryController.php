<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $query = Category::latest();

        $data = $query->paginate($request->per_page ?? 5);
    
        return response()->json([
            'status' => true,
            'data' => $data
        ], 200);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = new Category();

        $category->name = $request->name;
        $category->description = $request->description;

        $category->save();
       
       return response()->json([
        'status' => true,
        'data' => $category,
        'message' => 'Category added successfully!'
       ], 201);
    }


    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->name = $request->name;
        $category->description = $request->description;

        $category->save();

        return response()->json([
            'status' => true,
            'data' => $category,
            'message' => 'Category updated successfully!'
        ], 200);
    }

     public function show(Category $category)
    {
        return response()->json([
            'status' => true,
            'data' => $category,
        ], 200);
        
    }


    public function destroy(Category $category)
    {  
       $category->delete();
       return response()->noContent();
    }
}
