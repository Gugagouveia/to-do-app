import SideMenu from "@/components/side-menu";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full flex-row min-h-screen">
      <div>
        <SideMenu />
      </div>
      <div className="flex-grow p-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
