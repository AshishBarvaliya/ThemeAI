import { useHelpers } from "@/hooks/useHelpers";
import { cn } from "@/lib/utils";
import { BarChart4, PartyPopper, ZapIcon } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { TemplateList } from "./template-list";

const Sidebar = ({ width }: { width: string }) => {
  const router = useRouter();
  const { themeType, setThemeType } = useHelpers();

  const tabs = [
    {
      id: "explore",
      label: "Explore",
      icon: <ZapIcon className="w-5 h-5" />,
    },
    {
      id: "foryou",
      label: "For you",
      icon: <PartyPopper className="w-5 h-5" />,
    },
    {
      id: "popular",
      label: "Popular",
      icon: <BarChart4 className="w-5 h-5" />,
    },
  ];

  const isTemplate = router.pathname === "/themes/create";

  return (
    <div
      style={{ width: width }}
      className={`flex fixed flex-col bg-background justify-between h-screen pb-[74px] border-r-[0.5px] border-border shadow-lg`}
    >
      {isTemplate ? (
        <TemplateList />
      ) : (
        <div className="flex flex-col flex-1 gap-2 py-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() =>
                setThemeType(tab.id as "explore" | "foryou" | "popular")
              }
              className={cn(
                "flex gap-2.5 items-center py-2 px-8 mx-3 text-lg cursor-pointer hover:bg-primary/20",
                themeType === tab.id &&
                  "bg-primary/60 shadow-md hover:bg-primary/60"
              )}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
