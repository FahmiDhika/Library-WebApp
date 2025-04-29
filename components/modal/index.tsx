"use client";

import { ReactNode } from "react";

type Prop = {
  children: ReactNode;
  isShow: boolean;
  onClose: (status: boolean) => void;
};

const Modal = ({ children, isShow, onClose }: Prop) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose(false);
  };

  return (
    <div
      className={`w-full h-dvh z[9999] bg-slate-600/90 fixed top-0 left-0 ${
        isShow ? `flex` : `hidden`
      } justify-center items-center`}
      onClick={handleClickOutside}
    >
      <div className="w-5/6 md:w-4/6 lg:w-3/6 overflow-auto max-h-full bg-[#efeeea] rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default Modal;
