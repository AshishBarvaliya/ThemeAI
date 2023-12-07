import React from "react";
import Header from "./header";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

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

  const staticLoading =
    session.status === "loading" &&
    (router.pathname === "/" ||
      router.pathname === "/terms" ||
      router.pathname === "/privacy");

  const isLandingPage = router.pathname === "/";

  return staticLoading ? null : (
    <div className="flex flex-col items-center">
      <Header />
      <main
        className={cn(
          "flex w-full h-screen max-w-screen-2xl",
          isLandingPage ? "" : "pt-[54px] md:pt-[60px]"
        )}
      >
        {sidebar ? <Sidebar width={width} /> : null}
        {sidebar ? (
          <div className="flex flex-1" style={{ marginLeft: width }}>
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      {session.status === "loading" ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/20 z-[100] flex items-center justify-center">
          <div className="loader" />
        </div>
      ) : null}
    </div>
  );
};

export default Layout;
