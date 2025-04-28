"use client";

import { ReactNode, useState } from "react";
import { removeCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ItemList from "./itemList";

import logo from "@/public/assets/logo.png";

// icon import
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

type ItemType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type AdminProp = {
  children: ReactNode;
  id: string;
  title: string;
  itemList: ItemType[];
};

const Sidebar = ({ children, id, title, itemList }: AdminProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("userId");
    removeCookie("role");
    router.replace("/login");
  };

  return (
    <div className="w-screen min-h-dvh">
      {/* navbar / header section*/}
      <header className="w-full h-fit py-4 px-14 flex justify-between items-center">
        {/* button sidebar */}
        <button onClick={() => setIsShow(true)} type="button">
          <IoMenu size={32} className="cursor-pointer" />
        </button>

        {/* page title */}
        <h1 className="text-2xl font-bold tracking-wider border-b-2 px-2">
          {title}
        </h1>

        {/* button logout */}
        <button
          onClick={handleLogout}
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 
          cursor-pointer ease-in-out duration-300 hidden lg:block"
        >
          Log out
        </button>
      </header>

      {/* content section */}
      <div className="px-14 py-4">{children}</div>

      {/* sidebar section */}
      <div
        className={`flex flex-col w-2/3 lg:w-1/4 h-full px-4 py-4 rounded-r-2xl 
          transition-transform top-0 right-full fixed z-50 duration-1000 shadow-xl  
          ${
            isShow ? `translate-x-full` : ``
          } bg-[#273f4f] text-white text-center justify-between`}
      >
        <div className="">
          <div className="w-full flex justify-end mb-6">
            <button onClick={() => setIsShow(false)} className="cursor-pointer">
              <IoCloseCircleOutline size={32} />
            </button>
          </div>

          {/* sidebar logo */}
          <div className="">
            <div className="w-full flex justify-center">
              <Image src={logo} alt="" width={100} />
            </div>
            <h1 className="text-3xl font-bold tracking-wider mb-14">
              Library Apaaap
            </h1>
          </div>

          <div>
            {itemList.map((item, index) => (
              <ItemList
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={item.id === id}
                key={`keyMenu${index}`}
              />
            ))}
          </div>
        </div>

        {/* log out button */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleLogout}
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 
          cursor-pointer ease-in-out duration-300 block lg:hidden"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
