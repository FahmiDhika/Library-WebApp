import { ReactNode } from "react";

// icon import
import { CiWarning } from "react-icons/ci";

type Prop = {
  children: ReactNode;
  title: string;
};

export const AlertWarning = ({ children, title }: Prop) => {
  return (
    <div
      role="alert"
      className="my-2 bg-amber-300 px-6 py-2 flex gap-4 border-4 border-amber-200 rounded-2xl shadow-md"
    >
      <CiWarning size={50} />
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
};
