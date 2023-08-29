import React from "react";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full min-h-screen max-w-screen-2xl pt-[96px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
