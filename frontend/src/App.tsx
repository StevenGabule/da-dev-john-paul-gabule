import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './App.css';
import {nanoid} from "nanoid";
import {IList, ITask, TASK} from "./types/Lists";
import {baseUrl} from "./constant/todos";
import TableLists from "./components/TableLists";
import Form from "./components/Form";

const App = () => {
  const [currentId, setCurrentId] = useState('');
  const [task, setTask] = useState(TASK);
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todoLists, setTodoLists] = useState<IList[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const {data} = await (await fetch(`${baseUrl}/todos`)).json();
      setTodoLists(data);
    }
    loadTodos().then();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: `td-${nanoid()}`,
      title: task.title,
      description: task.description,
      level: task.level,
      status: task.status
    }

    if (!isEdit) {
      // @ts-ignore
      setTodoLists([newTask, ...todoLists]);
    }

    // @ts-ignore
    delete newTask.id;

    try {
      setIsLoading(true)
      const url = isEdit ? `${baseUrl}/todos/${currentId}` : `${baseUrl}/todos`;
      const data = await (await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newTask)
      })).json();

      if (data.updated || data.created) {
        setTask(TASK);
        setEdit(false);
        setCurrentId('');
        window.location.reload();
      }
    } catch (e: any) {
      console.log(e.message())
      alert(e.message())
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTask((prev) => ({...prev, [name]: value}));
  }

  const handleCancel = () => {
    setTask(TASK);
    setCurrentId('');
    setEdit(false);
  }

  const handleMarkAsDone = async (id: number) => {
    try {
      setIsLoading(true);
      await fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });

      window.location.reload();
    } catch (e: any) {
      console.error(e.message())
    } finally {
      setIsLoading(false);
    }
  }

  const filterStatus = async (statusCode: number) : Promise<void> => {
    try {
      const {data} = await (await fetch(`${baseUrl}/todos`)).json();
      if (statusCode === 0) {
        setTodoLists(data);
      } else {
        const newTaskLists = data.filter((todo: ITask) => todo.status === statusCode);
        setTodoLists(newTaskLists);
      }
    } catch (e: any) {
      console.error(e.message())
    }
  }

  return (
    <div className={'container'}>
      <div className="row">
        <div className="col-12">
          <h2>Todo Lists</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequatur id ipsa labore molestias
            neque quod rerum saepe sint ut. Aliquam deserunt earum eum ipsum laudantium optio sed unde
            voluptatibus!</p>

          <Form
            task={task}
            handleCancel={handleCancel}
            handleChange={handleChange}
            isEdit={isEdit}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="card mb-3">
            <div className="card-body">
              <h4>Table Information</h4>

              <button className={'btn btn-light btn-sm'} onClick={() => filterStatus(0)}>All</button>
              <button className={'btn btn-light btn-sm'} onClick={() => filterStatus(1)}>Pending</button>
              <button className={'btn btn-light btn-sm'} onClick={() => filterStatus(2)}>On Going</button>
              <button className={'btn btn-light btn-sm'} onClick={() => filterStatus(3)}>Completed/Dome</button>

              <table className={'table table-striped table-sm table-hover small'}>
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* @ts-ignore*/}
                <TableLists
                  handleMarkAsDone={handleMarkAsDone}
                  setEdit={setEdit}
                  setCurrentId={setCurrentId}
                  todoLists={todoLists}
                  setTask={setTask}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
