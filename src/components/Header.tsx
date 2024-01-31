import { useTodo } from "../context";
import Modal from "./modal/TodoModal";
import ToDoModalContent from "./modal/ToDoModalBody";

const Header = () => {
  const { handleModal } = useTodo();
  return (
    <>
      <div className="flex justify-between items-center bg-white rounded-2xl rounded-b-none px-8 py-5">
        <h2 className="text-2xl font-bold text-gray-700">Task List</h2>
        <button
          onClick={handleModal}
          className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="inline-block pr-1 bg-green-600">Add Task</span>
        </button>
        <Modal>
          <Modal.Header>
            <h3 className="text-2xl text-gray-600 font-semibold">Add new task</h3>
            <button onClick={handleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect width="24" height="24" fill="white" />
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Modal.Header>
          <ToDoModalContent />
        </Modal>
      </div>
    </>
  );
};

export default Header;
