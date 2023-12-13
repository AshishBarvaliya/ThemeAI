import DashboardTemplate from "@/assets/templates/dashboard/dashboard";
import EditorTemplate from "@/assets/templates/editor/editor";
import FoodieTemplate from "@/assets/templates/foodie/foodie";
import LearningTemplate from "@/assets/templates/learning/learning";
import MarketingTemplate from "@/assets/templates/marketing/marketing";
import DashboardTemplateMini from "@/assets/templates/dashboard/dashboard-mini";
import EditorTemplateMini from "@/assets/templates/editor/editor-mini";
import FoodieTemplateMini from "@/assets/templates/foodie/foodie-mini";
import LearningTemplateMini from "@/assets/templates/learning/learning-mini";
import MarketingTemplateMini from "@/assets/templates/marketing/marketing-mini";
import { TemplateProps, TemplateType } from "@/interfaces/templates";

export const getTemplate = (type: TemplateType, data: TemplateProps) => {
  switch (type) {
    case "Learning":
      return <LearningTemplate {...data} />;
    case "Marketing":
      return <MarketingTemplate {...data} />;
    case "Dashboard":
      return <DashboardTemplate {...data} />;
    case "Editor":
      return <EditorTemplate {...data} />;
    case "Foodie":
      return <FoodieTemplate {...data} />;
    default:
      return <></>;
  }
};

export const getMiniTemplate = (type: TemplateType, data: TemplateProps) => {
  switch (type) {
    case "Learning":
      return <LearningTemplateMini {...data} />;
    case "Marketing":
      return <MarketingTemplateMini {...data} />;
    case "Dashboard":
      return <DashboardTemplateMini {...data} />;
    case "Editor":
      return <EditorTemplateMini {...data} />;
    case "Foodie":
      return <FoodieTemplateMini {...data} />;
    default:
      return <></>;
  }
};
