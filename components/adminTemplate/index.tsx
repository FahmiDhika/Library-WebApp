import { ReactNode } from "react";
import Link from "next/link";
import Sidebar from "./sidebar";

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

const AdminTemplate = ({ children, id, title, itemList }: AdminProp) => {
  return (
    <div>
      <Sidebar id={id} title={title} itemList={itemList}>
        {children}
      </Sidebar>
    </div>
  );
};

export default AdminTemplate;
