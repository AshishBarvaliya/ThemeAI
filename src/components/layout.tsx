import React from "react";
import Header from "./header";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";

const Layout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: boolean;
}) => {
  const session = useSession();
  return session.status === "loading" ? null : (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full h-screen max-w-screen-2xl pt-[96px]">
        {sidebar ? <Sidebar /> : null}
        {sidebar ? (
          <div className="flex ml-[300px] flex-1">{children}</div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default Layout;
