import { IBook } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { get } from "@/lib/api-bridge";
import { BASE_API_URL } from "@/global";
import React from "react";
import { AlertWarning } from "@/components/alert";

// component feature
import Search from "./search";
import AddBook from "./addBook";

const getBook = async (search: string): Promise<IBook[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/book/get?search=${search}`;

    const { data } = await get(url, TOKEN);
    let result: IBook[] = [];

    console.log(data);

    if (data?.status)
      result = [...data.data].sort((a, b) => a.bookId - b.bookId);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const BookPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = await (searchParams.search
    ? searchParams.search.toString()
    : ``);

  const book: IBook[] = await getBook(search);

  const type = (type: string): React.ReactNode => {
    if (type === "HISTORY") {
      return (
        <p className="w-fit h-fit bg-[#A0522D] text-black text-sm font-bold px-4 py-1 rounded-full">
          History
        </p>
      );
    }
    if (type === "COMIC") {
      return (
        <p className="w-fit h-fit bg-[#FACC15] text-black text-sm font-bold px-4 py-1 rounded-full">
          Comic
        </p>
      );
    }
    if (type === "NOVEL") {
      return (
        <p className="w-fit h-fit bg-[#3B82F6] text-black text-sm font-bold px-4 py-1 rounded-full">
          Novel
        </p>
      );
    }
    if (type === "ENCYCLOPEDIA") {
      return (
        <p className="w-fit h-fit bg-[#1E3A8A] text-black text-sm font-bold px-4 py-1 rounded-full">
          Encyclopedia
        </p>
      );
    }
    if (type === "SCIENCE") {
      return (
        <p className="w-fit h-fit bg-[#065F46] text-black text-sm font-bold px-4 py-1 rounded-full">
          Science
        </p>
      );
    }
    if (type === "BIOGRAPHY") {
      return (
        <p className="w-fit h-fit bg-[#8B5CF6] text-black text-sm font-bold px-4 py-1 rounded-full">
          Biography
        </p>
      );
    } else {
      return (
        <p className="w-fit h-fit bg-[#9CA3AF] text-black text-sm font-bold px-4 py-1 rounded-full">
          Random
        </p>
      );
    }
  };

  const status = (status: string): React.ReactNode => {
    if (status === "READY") {
      return <p className="bg-green-300 w-fit px-4 py-1 rounded-full">READY</p>;
    } else {
      return (
        <p className="bg-red-300 w-fit px-4 py-1 rounded-full">BORROWED</p>
      );
    }
  };

  return (
    <div className="w-full h-fit">
      <h1 className="text-4xl font-bold">Book Data</h1>
      <p className="text-sm mb-4">
        This page displays book data, admin can view, add, edit, and even delete
        book data.
      </p>

      {/* page feature (search & add book) */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-full lg:w-1/3">
          <Search url="/admin/book" search={search} />
        </div>
        <div>
          <AddBook />
        </div>
      </div>

      {book.length == 0 ? (
        <AlertWarning title="Information">No data available.</AlertWarning>
      ) : (
        <div className="border-2 rounded-t-lg">
          <div className="flex mb-2 text-center border-b-2">
            <h1 className="w-1/12 font-black text-2xl">Book Id</h1>
            <h1 className="w-4/12 font-black text-2xl">Book Name</h1>
            <h1 className="w-2/12 font-black text-2xl">Book Type</h1>
            <h1 className="w-3/12 font-black text-2xl">Status</h1>
            <h1 className="w-2/12 font-black text-2xl">Action</h1>
          </div>
          {book.map((book) => (
            <div
              key={`book-${book.bookId}`}
              className="w-full flex mb-2 text-center"
            >
              <div className="w-1/12 flex justify-center items-center">
                <h1 className="">{book.bookId}</h1>
              </div>

              <div className="w-4/12 flex justify-center items-center">
                <h1 className="">{book.bookName}</h1>
              </div>

              {/* book type coloumn */}
              <div className="w-2/12 flex justify-center items-center">
                <h1 className="">{type(book.bookType)}</h1>
              </div>

              {/* book status coloumn */}
              <div className="w-3/12 flex justify-center items-center">
                <h1 className="">{status(book.status)}</h1>
              </div>

              <div className="w-2/12 flex justify-center items-center">
                <h1>Edit & Delete component</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookPage;
