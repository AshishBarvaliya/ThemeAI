import Typography from "@/components/ui/typography";
import {
  getAllFollowings,
  getNotifications,
  toggleFollowing,
} from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { INotification } from "@/interfaces/notification";
import { NotificationTile } from "@/components/notification-tile";
import { useToast } from "@/hooks/useToast";

export default function Settings() {
  const { status, data: session } = useSession();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<INotification[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const toggleFollow = async (notification: INotification) => {
    setLoading(true);
    toggleFollowing(notification.notifier.id)
      .then(() => {
        addToast({
          title: "You are now following " + notification.notifier.name,
          type: "success",
        });
      })
      .catch(() => {
        addToast({ title: "Failed to follow user", type: "error" });
      })
      .finally(() => {
        getFollowings();
      });
  };

  const getFollowings = async () => {
    setLoading(true);
    getAllFollowings()
      .then((res) => {
        setFollowing(res.data.followings?.map((e: any) => e.following.id));
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      setLoading(true);
      getNotifications()
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log("error", e);
        })
        .finally(() => {
          setLoading(false);
        });
      getFollowings();
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full my-6 border-[0.5px] border-border bg-white mx-36 p-[30px] px-[40px]">
      <Typography element="h1" as="h1" className="text-center">
        Notifications
      </Typography>
      <div className="flex flex-col mt-4 gap-4">
        {data.map((notification) => (
          <NotificationTile
            key={notification.id}
            notification={notification}
            loading={loading}
            toggleFollow={toggleFollow}
            isFollowing={following.includes(notification.notifier.id)}
          />
        ))}
      </div>
    </div>
  );
}
