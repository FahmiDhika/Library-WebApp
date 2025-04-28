"use client";

import React from "react";
import Link from "next/link";

interface itemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const ItemList = ({ icon, label, path, active }: itemProps) => {
  return (
    <Link
      href={path}
      className={`flex gap-2 px-4 py-2 items-center text-white bg-[#273f4f] hover:scale-105 ${
        active ? `bg-[#efeeea]` : ``
      } rounded-2xl`}
    >
      <span className={active ? `text-black` : ``}>{icon}</span>
      <span className={`text-md lg:text-lg ${active ? `text-black` : ``}`}>{label}</span>
    </Link>
  );
};

export default ItemList;
