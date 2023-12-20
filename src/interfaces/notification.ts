import { TemplateType } from "./templates";

export interface INotification {
  id: string;
  createdAt: Date;
  read: boolean;
  type: "FOLLOW" | "LIKE" | "SAVE";
  pupa?: string;
  theme?: {
    id: string;
    name: string;
    template: TemplateType;
    color_1: string;
    color_2: string;
    color_3: string;
    color_4: string;
  };
  notifier: {
    id: string;
    name: string;
    avatar?: string;
    image: string;
  };
}
