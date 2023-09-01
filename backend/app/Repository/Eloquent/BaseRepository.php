<?php

    use App\Exceptions\ModelNotDefined;
    use App\Repositories\Contracts\IBase;
    use App\Repositories\Criteria\ICriteria;
    use Illuminate\Contracts\Container\BindingResolutionException;

    class BaseRepository implements ICriteria, IBase
	{
        protected mixed $model;

        /**
         * BaseRepository constructor.
         */
        public function __construct()
        {
            $this->model = $this->getModelClass();
        }

        /**
         * @return mixed
         */
        public function all(): mixed
        {
            return $this->model->get();
        }

        /**
         * @param $id
         * @return mixed
         */
        public function find($id): mixed
        {
            $result = $this->model->findOrFail($id);
            return $result;
        }

        /**
         * @param $column
         * @param $value
         * @return mixed
         */
        public function findWhere($column, $value): mixed
        {
            return $this->model->where($column, $value)->get();
        }


        /**
         * @param $column
         * @param $value
         * @return mixed
         */
        public function findWhereFirst($column, $value): mixed
        {
            return $this->model->where($column, $value)->firstOrFail();
        }

        /**
         * @param int $perPage
         * @return mixed
         */
        public function paginate($perPage = 10): mixed
        {
            return $this->model->paginate($perPage);
        }

        /**
         * @param array $data
         * @return mixed
         */
        public function create(array $data): mixed
        {
            $result = $this->model->create($data);
            return $result;
        }

        /**
         * @param $id
         * @param array $data
         * @return mixed
         */
        public function update($id, array $data): mixed
        {
            $record = $this->find($id);
            $record->update($data);
            return $record;
        }

        /**
         * @param $id
         * @return mixed
         */
        public function delete($id): mixed
        {
            $record = $this->find($id);
            return $record->delete();
        }


        /**
         * @param ...$criteria
         * @return $this
         */
        public function withCriteria(...$criteria): static
        {
            $criteria = Arr::flatten($criteria);

            foreach($criteria as $criterion){
                $this->model = $criterion->apply($this->model);
            }

            return $this;
        }

        /**
         * @return mixed
         * @throws ModelNotDefined
         * @throws BindingResolutionException
         */
        protected function getModelClass(): mixed
        {
            if( !method_exists($this, 'model'))
            {
                throw new ModelNotDefined();
            }

            return app()->make($this->model());
        }
    }
