<?php

namespace App\Http\Requests;
use App\Models\Business;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBusinessRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'slug' => ['required','string','max:255',Rule::unique(Business::class)->ignore($this->user()->id)],
        ];
    }
}
