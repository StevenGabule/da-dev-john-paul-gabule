<?php
    namespace App\Repositories\Eloquent;

    use App\Models\Todo;
    use App\Repositories\Contracts\ITodo;

    class TodoRepository extends BaseRepository implements ITodo {

        public function model(): string
        {
            return Todo::class;
        }
    }
