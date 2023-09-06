export interface INotification {
  id: string;
  createdAt: Date;
  read: boolean;
  type: "FOLLOW" | "LIKE" | "SAVE" | "REWARD";
  pupa?: string;
  theme?: {
    id: string;
    name: string;
  };
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    image: string;
  };
  notifier: {
    id: string;
    name: string;
    avatar?: string;
    image: string;
  };
}
