import { ChangeEvent, useState } from "react";
import { useTodo } from "../../context";

const ToDoModalContent = () => {
  const { handleModal, addTodo } = useTodo();

  const initialTodo = {
    name: "",
    priority: "",
    status: "",
    completed: false
  };
  const [toDo, setTodo] = useState(initialTodo);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...toDo, [e.target.name]: e.target.value });
  };

  const addNewTodo = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toDo) return;
    const todoData = {
      name: toDo?.name,
      priority: toDo?.priority ? toDo.priority : "low",
      status: "To Do",
      completed: false
    };
    addTodo({ ...todoData });
    setTodo(initialTodo);
    handleModal();
  };

  return (
    <>
      <div className="pb-2 text-gray-600">
        <form onSubmit={addNewTodo}>
          {/* NAME INPUT */}
          <div className="mb-6">
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={toDo.name}
              placeholder="Enter task name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* PRIORITY/RADIO INPUTS */}
          <div className="px-2">
            <div className="flex items-center gap-x-8">
              <div className="flex items-center gap-1">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  name="priority"
                  id="high"
                  value="high"
                  className={`block border border-gray-500 rounded-full  focus:ring-1  ${toDo.priority === 'high' ? 'checked:bg-red-500 checked:border-red-500 text-red-500 focus:ring-red-500' : 'checked:bg-white checked:border-gray-500 focus:ring-white' }`}
                />
                <label htmlFor="high" className="font-medium text-sm">
                  High
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  name="priority"
                  id="medium"
                  value="medium"
                  className={`block border border-gray-500 rounded-full  focus:ring-1  ${toDo.priority === 'medium' ? 'checked:bg-yellow-500 checked:border-yellow-500 text-yellow-500 focus:ring-yellow-500' : 'checked:bg-white checked:border-gray-500 focus:ring-white' }`}
                />
                <label htmlFor="medium" className="font-medium text-sm">
                  Medium
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  name="priority"
                  id="low"
                  value="low"
                  className={`block border border-gray-500 rounded-full  focus:ring-1  ${toDo.priority === 'low' ? 'checked:bg-green-500 checked:border-green-500 text-green-500 focus:ring-green-500' : 'checked:bg-white checked:border-gray-500 focus:ring-white' }`}
                />
                <label htmlFor="low" className="font-medium text-sm">
                  Low
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              disabled={!toDo.name}
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                !toDo.name ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ToDoModalContent;
