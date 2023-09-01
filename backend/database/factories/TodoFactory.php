<?php

  namespace Database\Factories;

  use Illuminate\Database\Eloquent\Factories\Factory;
  use JetBrains\PhpStorm\ArrayShape;

  /**
   * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
   */
  class TodoFactory extends Factory
  {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['title' => "string", 'description' => "string", 'level' => "int", 'status' => "int", 'created_at' => "\Illuminate\Support\Carbon", 'update_at' => "\Illuminate\Support\Carbon"])]
    public function definition(): array
    {
      return [
        'title' => $this->faker->sentence(),
        'description' => $this->faker->text(100),
        'level' => rand(1, 3),
        'status' => rand(1, 3),
        'deleted_at' => null,
        'created_at' => now(),
        'updated_at' => now(),
      ];
    }
  }
