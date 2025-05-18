import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[300px] bg-gray-300 p-4 rounded-xl">{children}</div>
    </div>
  );
};
