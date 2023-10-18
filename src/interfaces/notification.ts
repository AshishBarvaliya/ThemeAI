export interface INotification {
  id: string;
  createdAt: Date;
  read: boolean;
  type: "FOLLOW" | "LIKE" | "SAVE";
  pupa?: string;
  theme?: {
    id: string;
    name: string;
  };
  notifier: {
    id: string;
    name: string;
    avatar?: string;
    image: string;
  };
}
