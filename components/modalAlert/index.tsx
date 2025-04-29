"use client";

import { useEffect } from "react";

type Prop = {
  title: string;
  message: string;
  onClose: () => void;
  type: "success" | "error";
};

const ModalAlert = ({ title, message, onClose, type }: Prop) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose();
    }, 2000); // auto close after 2 second

    return () => clearTimeout(timeOut);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl p-6 z-10 max-w-sm w-full">
          <h2
            className={`text-white text-lg font-bold px-4 py-2 rounded-t ${bgColor}`}
          >
            {title}
          </h2>
          <div className="mt-2 px-2 py-4 text-gray-700">{message}</div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
