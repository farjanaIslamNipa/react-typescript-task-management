import { createContext, useContext } from "react";

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
  addTodo: (toDo) => {},
  updateTodo: (id, toDo) => {},
  updateTodoStatus: (id, status) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
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