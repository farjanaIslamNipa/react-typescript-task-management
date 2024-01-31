import {useState} from "react";
import cn from "../utils/cn";
import {useTodo} from "../context";
import {TTask} from "../type";

const TodoItem = ({ toDo } : {toDo: TTask}) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoName, setTodoName] = useState(toDo?.name)
  const { updateTodo, toggleComplete, deleteTodo, status } = useTodo()

  // UPDATE STATUS
  const updateStatus = () => {
    if(toDo?.status === status.toDo){
      updateTodo(toDo.id, {...toDo, status: 'In Progress'})
    }else if(toDo?.status === status.inProgress){
      updateTodo(toDo.id, {...toDo, status: 'Done'})
    }else if(toDo?.status === status.done){
      updateTodo(toDo.id, {...toDo, status: 'To Do'})
    }
  }

  // UPDATE PRIORITY
  const updatePriority = () => {
    if(toDo?.priority === 'low'){
      updateTodo(toDo.id, {...toDo, priority: 'medium'})
    }else if(toDo?.priority === 'medium'){
      updateTodo(toDo.id, {...toDo, priority: 'high'})
    }else if(toDo?.priority === 'high'){
      updateTodo(toDo.id, {...toDo, priority: 'low'})
    }
  }

  // UPDATE TO DO
  const editToDo = () => {
    updateTodo(toDo.id, {...toDo, name: todoName})
    setIsTodoEditable(false)
  }

  // MARK COMPLETED
  const toggleCompleted = () => {
    toggleComplete(toDo.id)
  }


  // CAPITALIZE FIRST LETTER
  function capitalizeFirstLetter(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={cn("px-4 py-5 shadow grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 items-center rounded-md",
    {
      'bg-green-100' : toDo.completed
    }
    )}>

      {/* FIRST COLUMN/NAME & PRIORITY */}
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          if (isTodoEditable) {
              editToDo();
          } else setIsTodoEditable((prev) => !prev);
        }}>
          {
            !isTodoEditable ? <p className="text-gray-700 font-semibold text-[17px]">{capitalizeFirstLetter(todoName)}</p> :
            <input 
            type="text"
            className='w-full bg-transparent rounded-sm font-semibold text-gray-700 border-black/20 px-2 py-[2px] focus:border-gray-400 focus:outline-none focus:ring-0'
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            />
          }
        
        </form>
        <div className="flex items-center gap-[2px]">
          <span className=" text-sm text-gray-500">Priority:&nbsp;</span>
          <button 
          onClick={updatePriority} 
          disabled={toDo.completed}
          className={cn('text-sm font-bold capitalize text-green-500',
          {
            'text-red-600' : toDo?.priority === 'high', 
            'text-yellow-500' : toDo?.priority === 'medium', 
            'text-green-600' : toDo?.priority === 'low' 
          })}>
            {toDo?.priority}
          </button>
        </div>
      </div>


      {/* SECOND COLUMN/STATUS */}
      <div className="text-start md:text-center">
        <button 
        onClick={() => updateStatus()} 
        disabled={toDo.completed}
        className={cn('capitalize bg-gray-100 rounded-xl text-[13px] font-medium py-[2px] px-3', 
          {
            'text-gray-500' : toDo?.status === status.toDo,
            'text-orange-400' : toDo?.status === status.inProgress,
            'text-green-600' : toDo?.status === status.done,
            'text-gray-400' : toDo?.completed,
          }
        )}>
          {toDo?.completed ? 'Completed' : toDo?.status}
        </button>
      </div>


      {/* THIRD COLUMN/ACTION BUTTONS */}
      <div className="w-full flex gap-3 justify-start md:justify-end items-center">
        <div>
          <input
           checked={toDo.completed}
           onChange={toggleCompleted}
           title="Mark Complete" 
           type="checkbox" 
           className="h-[18px] w-[18px] border border-gray-400 rounded-sm text-green-500 focus:border-gray-400 focus:outline-none focus:ring-0" 
           />
        </div>
        <button 
        title="Edit" 
        disabled={toDo.completed}
        onClick={() => {
          if (isTodoEditable) {
            editToDo();
        } else setIsTodoEditable((prev) => !prev);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
          <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#4C4C4C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#4C4C4C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button title="Delete" onClick={() => {
          deleteTodo(toDo.id)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1024 1024" className="icon" version="1.1">
            <path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#DC1518"/><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#DC1518"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default TodoItem;