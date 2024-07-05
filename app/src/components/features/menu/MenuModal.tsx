import { ReactNode, useEffect, useRef, useState } from "react";

type MenuModalProps = {
  children: ReactNode;
  handleClickClose: () => void;
};

export function MenuModal({ children, handleClickClose }: MenuModalProps) {
  const [prevStyleOverflow] = useState<string>(document.body.style.overflow);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevStyleOverflow ?? "";
    };
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      handleClickClose();
    }
  };
  useEffect(() => {
    if (modalRef.current != null) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={modalRef}
      role="button"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={() => handleClickClose()} // 背景をクリックすると閉じる
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-black bg-opacity-60 p-16"
    >
      <div
        ref={modalRef}
        role="button"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
