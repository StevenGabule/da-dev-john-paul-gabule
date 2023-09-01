<?php

  namespace App\Http\Controllers;

  use App\Http\Resources\TodoResource;
  use App\Models\Todo;
  use App\Repositories\Contracts\ITodo;
  use App\Repositories\Eloquent\Criteria\LatestFirst;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
  use App\Http\Requests\{StoreTodoRequest, UpdateTodoRequest};

  class TodoController extends Controller
  {
    public function __construct(protected ITodo $todos) {}

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
      $listOfTodos = $this->todos->withCriteria([new LatestFirst()])->all();
      return TodoResource::collection($listOfTodos);
    }

    /**
     * @param StoreTodoRequest $request
     * @return JsonResponse
     */
    public function store(StoreTodoRequest $request): JsonResponse
    {
      $this->todos->create($request->all());
      return response()->json(['created' => true]);
    }

    /**
     * @param Todo $todo
     * @return TodoResource
     */
    public function show(Todo $todo): TodoResource
    {
      return new TodoResource($todo);
    }

    /**
     * @param UpdateTodoRequest $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(UpdateTodoRequest $request, Todo $todo): JsonResponse
    {
      $todo->update([
        'title' => $request->title,
        'description' => $request->description,
        'level' => $request->level,
        'status' => $request->status,
      ]);
      return response()->json(['updated' => true]);
    }

    public function markAsRead(Todo $todo): JsonResponse
    {
      $todo->update(['status' => 3]); // mark as complete/done but not erase in the table
      return response()->json([], 204);
    }
    /**
     * @param Todo $todo
     * @return JsonResponse
     */
    public function destroy(Todo $todo): JsonResponse
    {
      $todo->delete();
      return response()->json([], 204);
    }
  }
