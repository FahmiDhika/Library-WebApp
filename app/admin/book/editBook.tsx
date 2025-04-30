"use client";

import { IBook } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { useRef, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { InputGroup } from "@/components/input";
import Modal from "@/components/modal";
import Select from "@/components/select";

// icon import
import { IoIosCloseCircleOutline } from "react-icons/io";

const EditBook = ({ selectedBook }: { selectedBook: IBook }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [book, setBook] = useState<IBook>({ ...selectedBook });
  const router = useRouter();
  const TOKEN = getCookie("token") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setBook({ ...selectedBook });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/book/edit/${selectedBook.bookId}`;
      const { bookName, bookType, status } = book;
      const payload = new FormData();

      payload.append("bookName", bookName || "");
      payload.append("bookType", bookType || "");
      payload.append("status", status || "");

      const { data } = await put(url, payload, TOKEN);

      if (data?.status) {
        setIsShow(false);
        toast.success(data?.message, {
          hideProgressBar: false,
          containerId: `toastBook`,
          type: "success",
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warning(data?.message, {
          hideProgressBar: false,
          containerId: `toastBook`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something Wrong`, {
        hideProgressBar: false,
        containerId: `toastBook`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582
   16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1
   1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75
   21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* header */}
          <div className="sticky top-0 border-b-2 px-5 py-5">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Update Book</h1>
                <p className="text-sm mb-">Input data to update a new book.</p>
              </div>
              <IoIosCloseCircleOutline
                onClick={() => setIsShow(false)}
                size={36}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* input */}
          <div className="p-5">
            <InputGroup
              id={`bookName`}
              type="text"
              value={book.bookName}
              onChange={(val) => setBook({ ...book, bookName: val })}
              required={true}
              label="Book Name :"
            />

            <Select
              id={`bookType`}
              value={book.bookType}
              label="Book Type :"
              required={true}
              onChange={(val) => setBook({ ...book, bookType: val })}
            >
              <option value="">--- Select Book Type ---</option>
              <option value="RANDOM">RANDOM</option>
              <option value="HISTORY">HISTORY</option>
              <option value="COMIC">COMIC</option>
              <option value="NOVEL">NOVEL</option>
              <option value="ENCYCLOPEDIA">ENCYCLOPEDIA</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
            </Select>

            <Select
              id={`status`}
              value={book.status}
              label="Status :"
              required={true}
              onChange={(val) => setBook({ ...book, status: val })}
            >
              <option value="">--- Select Book Status ---</option>
              <option value="READY">READY</option>
              <option value="BORROWED">BORROWED</option>
            </Select>
          </div>

          {/* button */}
          <div className="w-full p-5 flex justify-between">
            <button
              onClick={() => setIsShow(false)}
              className="bg-red-400 px-4 py-2 rounded-xl cursor-pointer shadow-lg"
              type="button"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-400 px-4 py-2 rounded-xl cursor-pointer shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditBook;
