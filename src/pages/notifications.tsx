import Typography from "@/components/ui/typography";
import { NotificationTile } from "@/components/notification-tile";
import { getNotifications, toggleFollowing } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFollowingStatus } from "@/services/user-details";

export default function Settings() {
  const queryClient = useQueryClient();
  const { data: notifications } = useQuery(
    ["user", "notifications"],
    getNotifications
  );
  const { data: userFollowingStatus } = useQuery(
    ["home", "userfollowingstatus"],
    () => getUserFollowingStatus(true)
  );
  const { mutate: mutateUserFollowing } = useMutation({
    mutationFn: (userId: string) => toggleFollowing(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["home", "userfollowingstatus"]);
      queryClient.invalidateQueries(["user", "notifications"]);
    },
  });

  return (
    <div className="flex flex-col w-full my-6 border-[0.5px] border-border bg-white mx-36 p-[30px] px-[40px]">
      <Typography element="h1" as="h1" className="text-center">
        Notifications
      </Typography>
      <div className="flex flex-col mt-4 gap-4 overflow-y-auto px-4">
        {notifications?.map((notification) => (
          <NotificationTile
            key={notification.id}
            notification={notification}
            toggleFollow={mutateUserFollowing}
            isFollowing={userFollowingStatus?.includes(
              notification.notifier.id
            )}
          />
        ))}
      </div>
    </div>
  );
}
