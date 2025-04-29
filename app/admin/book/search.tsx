"use client";

import { Ultra } from "next/font/google";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

type Props = {
  url: string;
  search: string;
};

const Search = ({ url, search }: Props) => {
  const [keyword, setKeyword] = useState<string>(search);
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`${url}?search=${keyword}`);
  };

  return (
    <input
      type="text"
      id="keyword"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="px-4 py-2 text-sm w-full rounded-md bg-slate-100 border-2 text-black focus:outline-none"
      placeholder="Search..."
      onKeyUp={handleSearch}
    />
  );
};

export default Search;
