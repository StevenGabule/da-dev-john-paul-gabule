import {ChangeEvent, FormEvent} from "react";

export interface IList {
  id: number | string | undefined
  title: string
  description: string
  status: number
  level: number
  created_at: string
  updated_at: string
}

export interface ITask {
  title: string,
  description: string,
  level: number,
  status: number,
}

export const TASK: ITask = {
  title: '',
  description: '',
  level: 1,
  status: 1,
}

export interface ITableLists {
  todoLists: IList[],
  setTask: (task: { title: string, description: string, status: number, level: number,}) => void,
  setCurrentId: (todoId: string) => void,
  setEdit: (edit: boolean) => void,
  handleMarkAsDone: (id: number) => void
  handleRemove: (id: number) => void
}

export interface IForm {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  task: ITask,
  isEdit: boolean,
  isLoading: boolean,
  handleCancel: () => void
}
