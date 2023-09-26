import React from "react";
import Header from "./header";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

const Layout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: boolean;
}) => {
  const session = useSession();
  const router = useRouter();

  const width = router.pathname === "/themes/create" ? "250px" : "200px";

  return session.status === "loading" ? null : (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full h-screen max-w-screen-2xl pt-[60px]">
        {sidebar ? <Sidebar width={width} /> : null}
        {sidebar ? (
          <div className="flex flex-1" style={{ marginLeft: width }}>
            {children}
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default Layout;
