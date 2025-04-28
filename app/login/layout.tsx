import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Login | Library",
  description: "Build & Develop by Fahmi Dhika",
};

type propsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: propsLayout) => {
  return (
    <div>
      {children}
      <ToastContainer containerId={`toastLogin`} />
    </div>
  );
};

export default RootLayout;
