<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'videos' => 'nullable',
            'actors' => 'array|min:1',
            'generals' => 'array|min:1',
            'category_id' => 'required|integer',
            'banner' => 'nullable',
            'poster' => 'nullable',
            'title' => 'required|string|max:100',
            'release_date' => 'required|date',
            'runtime' => 'required|integer',
            'description' => 'nullable'
        ];
    }
}
