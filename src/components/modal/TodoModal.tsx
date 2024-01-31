import { MouseEvent, ReactNode, useRef } from "react";
import { useTodo } from "../../context";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";

const ToDoModal = ({ children }: { children: ReactNode }) => {
  const { modal, handleModal } = useTodo();

  const containerRef = useRef<HTMLDivElement>(null);
  const closeModalFromOutside = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      handleModal();
    }
  };

  return createPortal(
    <div
      onClick={closeModalFromOutside}
      className={cn(
        "flex justify-center items-center fixed inset-0 bg-gray-800/40 invisible z-[999]",
        { visible: modal }
      )}
    >
      <div
        ref={containerRef}
        className="bg-white w-full max-w-[500px] px-10 py-10 rounded-2xl"
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal") as Element
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center pb-10">{children}</div>
  );
};

ToDoModal.Header = Header;

export default ToDoModal;
