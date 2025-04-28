import { ReactNode } from "react";

// icon import
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

interface IPropItem {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
}

let itemList: IPropItem[] = [
  {
    id: `dashboard`,
    label: `Dashboard`,
    path: `/admin/dashboard`,
    icon: <FiHome />,
  },
  {
    id: `user`,
    label: `User`,
    path: `/admin/user`,
    icon: <FaRegUser />,
  },
  {
    id: `book`,
    label: `Book`,
    path: `/admin/book`,
    icon: <FaBook />,
  },
  {
    id: `history`,
    label: `History`,
    path: `/admin/history`,
    icon: <IoDocumentTextOutline />,
  },
];

export default itemList;
