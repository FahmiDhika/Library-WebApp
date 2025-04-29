"use client";

import { IBook } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { InputGroup } from "@/components/input";
import Modal from "@/components/modal";
import Select from "@/components/select";

// icon import
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddBook = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const [book, setBook] = useState<IBook>({
    bookId: 0,
    uuid: ``,
    bookName: ``,
    bookType: ``,
    status: ``,
    createdAt: ``,
    updatedAt: ``,
  });

  const router = useRouter();
  const TOKEN = getCookie("token") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setBook({
      bookId: 0,
      uuid: ``,
      bookName: ``,
      bookType: ``,
      status: ``,
      createdAt: ``,
      updatedAt: ``,
    });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/book/add`;
      const { bookName, bookType } = book;
      const payload = new FormData();

      payload.append("bookName", bookName || "");
      payload.append("bookType", bookType || "");
      const { data } = await post(url, payload, TOKEN);

      if (data?.status) {
        setIsShow(false);
        toast.success(data?.message, {
          hideProgressBar: false,
          containerId: `toastBook`,
          type: `success`,
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
        className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer font-bold text-white"
      >
        + Add Book
      </button>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* modal header */}
          <div className="sticky top-0 border-b-2 px-5 py-5">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Add New Book</h1>
                <p className="text-sm mb-">Input data to add a new book.</p>
              </div>
              <IoIosCloseCircleOutline
                onClick={() => setIsShow(false)}
                size={36}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* input section */}
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
          </div>

          <div className="w-full p-5 flex justify-between">
            <button
              onClick={() => setIsShow(false)}
              className="bg-red-400 px-4 py-2 rounded-xl cursor-pointer shadow-lg"
              type="button"
            >
              Cancel
            </button>

            <button type="submit" className="bg-green-400 px-4 py-2 rounded-xl cursor-pointer shadow-lg">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddBook;
