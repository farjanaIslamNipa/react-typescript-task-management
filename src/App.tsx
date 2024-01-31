/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TTask } from "./type";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";

const App = () => {
  const [toDos, setToDos] = useState<TTask[]>([]);

  const addTodo = (toDo: any) => {
    setToDos((prev) => [{ id: Date.now(), ...toDo }, ...prev]);
  };

  const updateTodo = (id: string, toDo: any) => {
    setToDos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? toDo : prevTodo))
    );
  };

  const deleteTodo = (id: string) => {
    setToDos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setToDos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const toDos = JSON.parse(localStorage.getItem("toDos") as string);
    if (toDos && toDos.length > 0) {
      setToDos(toDos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  // FILTER BY STATUS
  const  status  = {
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  };
  const [filterStatus, setFilterStatus] = useState("All");
  const onFilterValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredTodoList = toDos.filter((prevTodo) => {
    if (filterStatus === "To Do") {
      return prevTodo.status === status.toDo;
    } else if (filterStatus === "In Progress") {
      return prevTodo.status === status.inProgress;
    } else if (filterStatus === "Done") {
      return prevTodo.status === status.done;
    } else if (filterStatus === "All") {
      return prevTodo;
    }
  });

  return (
    <TodoProvider
      value={{
        toDos,
        addTodo,
        updateTodo,
        deleteTodo,
        modal,
        handleModal,
        status,
        toggleComplete,
      }}
    >
      <div className="w-full max-w-[850px] mx-auto py-10 px-8">
        <Header />
        <div className="mt-2 bg-white rounded-2xl rounded-t-none px-8 pt-6 pb-8">
          <div className="flex justify-end">
            <select
              name=""
              id=""
              onChange={onFilterValueChange}
              className="border border-gray-300 py-1 rounded-sm text-sm text-gray-500 focus:border-gray-400 focus:ring-0"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          {filteredTodoList.length > 0 ? (
            filteredTodoList.map((toDo) => (
              <div key={toDo.id} className="w-full mt-2">
                <TodoItem toDo={toDo} />
              </div>
            ))
          ) : (
            <div>
              <p className="text-center pt-5 text-lg text-gray-400 font-medium">
                Task list is empty
                <button
                  onClick={handleModal}
                  className="underline text-green-600 text-base px-1"
                >
                  Add Task
                </button>
              </p>
              <div className="w-full flex justify-center items-center opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300px"
                  height="300px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 18.5L20 13.5M20 18.5L15 13.5"
                    stroke="#1C274C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.5"
                    d="M21 6L3 6"
                    stroke="#1C274C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M21 10L3 10"
                    stroke="#1C274C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M11 14L3 14"
                    stroke="#1C274C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M11 18H3"
                    stroke="#1C274C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
