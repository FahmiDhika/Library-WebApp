import AdminTemplate from "@/components/adminTemplate";
import itemList from "../itemList";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Book | Library",
  description: "Build & Develop by Fahmi Dhika",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <AdminTemplate title="Book" id="book" itemList={itemList}>
      {children}
      <ToastContainer containerId={`toastBook`} position="top-right" autoClose={2000}/>
    </AdminTemplate>
  );
};

export default RootLayout;
