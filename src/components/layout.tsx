import React, { useEffect, useState } from "react";
import Header from "./header";
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
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);

  const width = router.pathname === "/themes/create" ? "250px" : "200px";

  const isLandingPage = router.pathname === "/";

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main
        className={cn(
          "flex w-full flex-col md:flex-row h-screen max-w-screen-2xl",
          isLandingPage ? "" : "pt-[54px] md:pt-[60px]"
        )}
      >
        {sidebar ? <Sidebar width={width} isMobileView={isMobileView} /> : null}
        {sidebar ? (
          <div
            className="flex flex-1"
            style={isMobileView ? {} : { marginLeft: width }}
          >
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
