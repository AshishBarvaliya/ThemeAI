import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NiceAvatar from "react-nice-avatar";
import { INotification } from "@/interfaces/notification";
import Typography from "./ui/typography";
import moment from "moment";
import { Button } from "./ui/button";

interface INotificationTileProps {
  notification: INotification;
  toggleFollow: (n: INotification) => void;
  loading: boolean;
  isFollowing?: boolean;
}

const getMessage = (notification: INotification) => {
  if (notification.type === "FOLLOW") {
    return (
      <Typography element="p" as="p" className="font-normal">
        <span className="font-semibold cursor-pointer hover:text-secondary">
          {notification.notifier.name}
        </span>{" "}
        started following you.
      </Typography>
    );
  }
};

export const NotificationTile: React.FC<INotificationTileProps> = ({
  notification,
  toggleFollow,
  loading,
  isFollowing,
}) => {
  return (
    <div
      key={notification.id}
      className="flex border-[0.5px] border-border p-1"
    >
      <Avatar className="h-12 w-12 border-[0.5px] border-border rounded-[6px]">
        {notification.notifier.avatar ? (
          <NiceAvatar
            className="h-12 w-12 rounded-md"
            {...JSON.parse(notification.notifier.avatar)}
            shape="square"
          />
        ) : (
          <>
            <AvatarImage
              src={notification?.notifier.image}
              alt="profile image"
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-3xl rounded-md">
              {notification?.notifier.name?.split(" ")[0][0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex justify-between flex-1">
        <div className="flex flex-col ml-3 justify-between">
          <div>{getMessage(notification)}</div>
          <Typography element={"p"} as="p" className="text-xs">
            {moment(notification.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="flex items-center mr-2">
          <Button
            size="md"
            onClick={() => toggleFollow(notification)}
            disabled={loading}
            variant={isFollowing ? "outline" : "default"}
          >
            {isFollowing ? "Following" : "Follow back"}
          </Button>
        </div>
      </div>
    </div>
  );
};
