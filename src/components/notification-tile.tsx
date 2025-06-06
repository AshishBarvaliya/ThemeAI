import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NiceAvatar from "react-nice-avatar";
import { INotification } from "@/interfaces/notification";
import Typography from "./ui/typography";
import moment from "moment";
import { Button } from "./ui/button";
import Link from "next/link";
import { generateAllShades } from "@/lib/utils";
import { useRouter } from "next/router";
import { getMiniTemplate } from "@/lib/templates";

interface INotificationTileProps {
  notification: INotification;
  userFollow: (id: string) => void;
  isFollowing?: boolean;
  disabled?: boolean;
  isRead: boolean;
}

const getMessage = (notification: INotification) => {
  if (notification.type === "FOLLOW") {
    return (
      <Typography element="p" as="p" className="font-normal">
        <Link
          href={`/user/${notification.notifier.id}`}
          className="font-semibold cursor-pointer hover:text-secondary hover:underline"
        >
          {notification.notifier.name}
        </Link>
        {" started following you."}
      </Typography>
    );
  }
  if (notification.type === "LIKE" || notification.type === "SAVE") {
    return (
      <Typography element="p" as="p" className="font-normal">
        <Link
          href={`/user/${notification.notifier.id}`}
          className="font-semibold cursor-pointer hover:text-secondary hover:underline"
        >
          {notification.notifier.name}
        </Link>
        {` ${notification.type === "LIKE" ? "liked" : "saved"} your `}
        <Link
          href={`/themes/${notification?.theme?.id}`}
          className="font-semibold cursor-pointer hover:text-secondary hover:underline"
        >
          {notification?.theme?.name}
        </Link>
        {" theme."}
      </Typography>
    );
  }
};

export const NotificationTile: React.FC<INotificationTileProps> = ({
  notification,
  userFollow,
  isFollowing,
  disabled,
  isRead,
}) => {
  const router = useRouter();

  const colors = notification.theme
    ? {
        bg: notification?.theme?.color_1,
        primary: notification?.theme?.color_2,
        accent: notification?.theme?.color_3,
        extra: notification?.theme?.color_4,
      }
    : null;

  return (
    <div
      key={notification.id}
      className="flex relative bg-white border-[0.5px] border-border p-1 fade-in-0 max-h-[57px] shadow-md animate-in slide-in-from-top-2"
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
            {moment.utc(notification.createdAt).local().fromNow()}
          </Typography>
        </div>
        {notification.type === "FOLLOW" ? (
          <div className="flex items-center mr-2">
            <Button
              size="md"
              onClick={() =>
                isFollowing
                  ? router.push(`/user/${notification.notifier.id}`)
                  : userFollow(notification.notifier.id)
              }
              disabled={disabled}
              variant={isFollowing ? "outline" : "default"}
            >
              {isFollowing ? "View profile" : "Follow back"}
            </Button>
          </div>
        ) : (
          <div className="w-20 mr-2">
            {notification.theme && colors
              ? getMiniTemplate(notification.theme.template, {
                  id: `notification-${notification?.theme?.id}`,
                  colors: colors,
                  shades: generateAllShades(colors),
                  fonts: {
                    primary: {
                      fontFamily: "Roboto",
                      weights: [],
                    },
                    secondary: {
                      fontFamily: "Poppins",
                      weights: [],
                    },
                  },
                })
              : null}
          </div>
        )}
      </div>
      {!isRead && (
        <div className="absolute w-[3px] top-0 h-full right-0 bg-secondary" />
      )}
    </div>
  );
};
