<?php

  namespace App\Providers;

  use App\Repositories\Contracts\ITodo;
  use App\Repositories\Eloquent\TodoRepository;
  use Illuminate\Support\ServiceProvider;

  class RepositoryServiceProvider extends ServiceProvider
  {
    /**
     * Register services.
     */
    public function register(): void
    {
      //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
      $this->app->bind(ITodo::class, TodoRepository::class);
    }
  }
