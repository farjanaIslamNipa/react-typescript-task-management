/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import {TTask} from "../type";

export const TodoContext = createContext({
  toDos: [
    {
      id: '1',
      name: 'Todo name',
      priority: 'high',
      status: 'To Do',
      completed: false
    }
  ],
  addTodo: (_toDo : TTask) => {},
  updateTodo: (_id : string, _toDo : Partial<TTask>) => {},
  deleteTodo: (_id: string) => {},
  toggleComplete: (_id: string) => {},
  status: {
    toDo: '',
    inProgress: '',
    done: ''
  },
  modal: false,
  handleModal: () => {}
})

export const useTodo = () => {
  return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider