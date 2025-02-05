<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;
  use JetBrains\PhpStorm\ArrayShape;

  class StoreTodoRequest extends FormRequest
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
     * @return array
     */
    #[ArrayShape(['title' => "string"])]
    public function rules(): array
    {
      return [
        'title' => 'required|string|max:255',
      ];
    }
  }
