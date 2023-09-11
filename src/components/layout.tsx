import React from "react";
import Header from "./header";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  return session.status === "loading" ? null : (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full h-screen max-w-screen-2xl pt-[96px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
