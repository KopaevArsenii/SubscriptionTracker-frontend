import { FC, ReactNode } from "react";
import { Header } from "@/widgets/Layouts/Header.tsx";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[1120px] mx-auto">
      <Header />
      <div className="h-[calc(100vh-80px)]">{children}</div>
    </div>
  );
};
