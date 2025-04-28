import AdminTemplate from "@/components/adminTemplate";
import itemList from "../itemList";

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
    </AdminTemplate>
  );
};

export default RootLayout;
