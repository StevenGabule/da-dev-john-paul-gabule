<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['id' => "mixed", 'title' => "mixed", 'description' => "mixed", 'level' => "mixed", 'status' => "mixed", 'created_at' => "mixed", 'updated_at' => "mixed"])]
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'title' => $this->title,
          'description' => $this->description,
          'level' => $this->level,
          'status' => $this->status,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
        ];
    }
}
