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
      getIcon: (isActive: boolean) => (
        <ZapIcon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
      ),
    },
    ...(status === "authenticated"
      ? [
          {
            id: "foryou",
            label: "For you",
            getIcon: (isActive: boolean) => (
              <PartyPopper
                className="w-4 h-4"
                strokeWidth={isActive ? 2.5 : 2}
              />
            ),
          },
        ]
      : []),
    {
      id: "popular",
      label: "Popular",
      getIcon: (isActive: boolean) => (
        <BarChart4 className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
      ),
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
            <HeaderSearchBar forMobile />
          </div>
          <div className="flex overflow-y-auto md:flex-col flex-1 gap-2 py-2 md:py-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() =>
                  setThemeType(tab.id as "explore" | "foryou" | "popular")
                }
                className={cn(
                  "flex gap-2.5 items-center py-2 px-2 md:px-9 mx-3 text-base cursor-pointer hover:bg-primary/20",
                  themeType === tab.id &&
                    "bg-primary/60 shadow-inset hover:bg-primary/60 font-[500]"
                )}
              >
                {tab.getIcon(themeType === tab.id)}
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
