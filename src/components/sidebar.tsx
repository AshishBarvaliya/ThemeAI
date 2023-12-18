import { useSession } from "next-auth/react";
import { useHelpers } from "@/hooks/useHelpers";
import { cn } from "@/lib/utils";
import { BarChart4, PartyPopper, ZapIcon } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { TemplateList } from "./template-list";
import HeaderSearchBar from "./header-searchbar";

const Sidebar = ({
  width,
  isMobileView,
}: {
  width: string;
  isMobileView: boolean;
}) => {
  const router = useRouter();
  const { status } = useSession();
  const { themeType, setThemeType } = useHelpers();

  const tabs = [
    {
      id: "explore",
      label: "Explore",
      icon: <ZapIcon className="w-5 h-5" />,
    },
    ...(status === "authenticated"
      ? [
          {
            id: "foryou",
            label: "For you",
            icon: <PartyPopper className="w-5 h-5" />,
          },
        ]
      : []),
    {
      id: "popular",
      label: "Popular",
      icon: <BarChart4 className="w-5 h-5" />,
    },
  ];

  const isTemplate = router.pathname === "/themes/create";

  return (
    <div
      style={
        isMobileView
          ? { width: "100%" }
          : { width: width, boxShadow: "7px 0 15px -15px rgba(0, 0, 0, 0.2)" }
      }
      className={`flex md:fixed bg-background flex-col md:flex-row justify-between md:h-screen md:pb-[74px] md:border-r-[0.5px] border-border`}
    >
      {isTemplate ? (
        <TemplateList />
      ) : (
        <>
          <div className="flex md:hidden px-2 gap-1 py-1 pt-2">
            <HeaderSearchBar />
          </div>
          <div className="flex overflow-y-auto md:flex-col flex-1 gap-2 py-2 md:py-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() =>
                  setThemeType(tab.id as "explore" | "foryou" | "popular")
                }
                className={cn(
                  "flex gap-2.5 items-center py-2 px-2 md:px-8 mx-3 text-lg cursor-pointer hover:bg-primary/20",
                  themeType === tab.id &&
                    "bg-primary/60 shadow-md hover:bg-primary/60"
                )}
              >
                {tab.icon}
                {tab.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
