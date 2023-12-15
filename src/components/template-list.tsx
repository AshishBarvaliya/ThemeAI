import Typography from "./ui/typography";
import { DEAFULT_THEMES } from "@/constants/templates";
import LearningTemplate from "@/assets/templates/learning/learning-mini";
import MarketingTemplate from "@/assets/templates/marketing/marketing-mini";
import DashboardTemplate from "@/assets/templates/dashboard/dashboard-mini";
import EditorTemplate from "@/assets/templates/editor/editor-mini";
import FoodieTemplate from "@/assets/templates/foodie/foodie-mini";
import { TemplateType } from "@/interfaces/templates";
import { cn } from "@/lib/utils";
import { useHelpers } from "@/hooks/useHelpers";

export const templates: { name: TemplateType; component: JSX.Element }[] = [
  {
    name: "Learning",
    component: <LearningTemplate {...DEAFULT_THEMES.Learning} />,
  },
  {
    name: "Marketing",
    component: <MarketingTemplate {...DEAFULT_THEMES.Marketing} />,
  },
  {
    name: "Dashboard",
    component: <DashboardTemplate {...DEAFULT_THEMES.Dashboard} />,
  },
  {
    name: "Editor",
    component: <EditorTemplate {...DEAFULT_THEMES.Editor} />,
  },
  {
    name: "Foodie",
    component: <FoodieTemplate {...DEAFULT_THEMES.Foodie} />,
  },
];

export const TemplateList = () => {
  const { setTemplate, template } = useHelpers();

  return (
    <div className="md:flex flex-col hidden items-center pt-4 h-full">
      <Typography element="h3" as="h3">
        Templates
      </Typography>
      <div className="flex flex-col gap-5 px-4 py-1 flex-1 overflow-y-auto mt-4">
        {templates.map((item) => (
          <div
            key={item.name}
            className={cn(
              "w-full border-border border-[0.5px] shadow-md cursor-pointer hover:ring-1",
              item.name === template ? "ring-1 ring-primary" : ""
            )}
            onClick={() => setTemplate(item.name)}
          >
            {item.component}
            <div className="text-base text-center bg-primary text-primary-foreground border-border border-t-[0.5px]">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
