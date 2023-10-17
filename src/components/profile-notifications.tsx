import { NotificationTile } from "@/components/notification-tile";
import {
  followUser,
  getAllFollowings,
  getNotifications,
  markNotificationAsRead,
} from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { INotification } from "@/interfaces/notification";
import { useToast } from "@/hooks/useToast";

export default function ProfileNotifications() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { data: session } = useSession();
  const [filter, setFilter] = useState("All");
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const { data: notifications } = useQuery(
    ["user", "notifications"],
    getNotifications
  );
  const { data: followings } = useQuery(["following", session?.user.id], () =>
    getAllFollowings(session?.user.id as string)
  );

  const { mutate: mutatemMarkNotification, isLoading: isLoadingMark } =
    useMutation({
      mutationFn: () => markNotificationAsRead(),
      onSuccess: ({ markAsRead }) => {
        queryClient.invalidateQueries(["user", "notification", "new"]);
        addToast({
          title: "Notifications mark as read successfully",
          type: "success",
        });
        if (markAsRead) {
          queryClient.setQueriesData(
            ["user", "notifications"],
            [
              ...(notifications?.map((notification) => {
                if (notification.id === markAsRead) {
                  return {
                    ...notification,
                    read: true,
                  };
                }
                return notification;
              }) as INotification[]),
            ]
          );
        }
      },
    });

  const { mutate: mutateUserFollow, isLoading: isLoadingFollow } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["following", session?.user.id]);
    },
  });

  const list = [
    {
      name: "All",
    },
    {
      name: "Like",
    },
    {
      name: "Save",
    },
    {
      name: "Follow",
    },
    {
      name: "Reward",
    },
  ];

  const reads: string[] = [];
  const BreakException = {};
  try {
    notifications?.forEach(function (el) {
      if (!el.read) {
        reads.push(el.id);
      } else {
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return (
    <div className="flex w-[75%] flex-col py-4 gap-4 overflow-y-auto px-4">
      <div className="flex justify-between">
        <Button
          size={"md"}
          onClick={() => (reads.length > 0 ? mutatemMarkNotification() : null)}
          disabled={reads.length === 0 || isLoadingMark}
        >
          Mark as read
        </Button>
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-fit h-8 text-xs">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {list?.map((itm) => (
              <SelectItem key={itm.name} value={itm.name} className="text-xs">
                {itm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {(filter === "All"
        ? notifications
        : notifications?.filter(
            (notification) => notification.type === filter.toUpperCase()
          )
      )?.map((notification) => (
        <NotificationTile
          key={notification.id}
          notification={notification}
          userFollow={(id) => {
            setLoadingUser(id);
            mutateUserFollow(id);
          }}
          isRead={!reads.find((id) => id === notification.id)}
          disabled={loadingUser === notification.notifier.id && isLoadingFollow}
          isFollowing={
            !!followings?.find(
              (following) => following.id === notification.notifier.id
            )
          }
        />
      ))}
    </div>
  );
}
