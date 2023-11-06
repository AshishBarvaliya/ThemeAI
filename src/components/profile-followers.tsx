import { followUser, getAllFollowers, getAllFollowings } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserTile } from "./profile-following";
import { NextRouter, useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { UserProps } from "@/interfaces/user";
import { useState } from "react";
import { EmptyState } from "./empty-state";
import { User2 } from "lucide-react";

interface ProfileFollowersProps {
  user: UserProps | undefined;
}

const ProfileFollowers: React.FC<ProfileFollowersProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const { data: followers, isLoading: isLoadingFollowers } = useQuery(
    ["followers", router.query.id],
    () => getAllFollowers(router.query.id as string)
  );
  const { data: followings } = useQuery(["following", router.query.id], () =>
    getAllFollowings(router.query.id as string)
  );

  const { mutate: mutateUserFollow, isLoading: isLoadingUnfollow } =
    useMutation({
      mutationFn: (userId: string) => followUser(userId),
      onSuccess: ({ followingId }) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        queryClient.invalidateQueries(["followers", router.query.id]);
        queryClient.invalidateQueries(["following", router.query.id]);
        if (user) {
          queryClient.setQueryData(["user", router.query.id], {
            ...user,
            following: [...user.following, { followingId }],
          });
        }
      },
    });

  return (
    <div className="flex h-full flex-col mt-4 gap-3 px-4 w-[75%]">
      {isLoadingFollowers ? (
        <div className="flex justify-center items-center flex-1 h-full">
          Loading...
        </div>
      ) : followers?.length !== 0 ? (
        <EmptyState
          icon={<User2 className="w-6 h-6" />}
          title={
            user?.id === session?.user?.id
              ? "You don't have any followers"
              : `${user?.name} doesn't have any followers`
          }
        />
      ) : (
        followers?.map((user) => (
          <UserTile
            key={user.id}
            user={user}
            button={renderFollowStatusButton(
              session?.user?.id,
              user.id,
              router,
              mutateUserFollow,
              !!followings?.find((following) => following.id === user.id),
              loadingUser,
              setLoadingUser,
              isLoadingUnfollow
            )}
          />
        ))
      )}
    </div>
  );
};

export const renderFollowStatusButton = (
  sessionUserId: string | undefined,
  userId: string | undefined,
  router: NextRouter,
  mutateUserFollow: (id: string) => void,
  isFollowing: boolean,
  loadingUser: string | null,
  setLoadingUser: (id: string | null) => void,
  isLoadingUnfollow: boolean
) => {
  if (router.query.id === sessionUserId && !isFollowing) {
    return (
      <Button
        size="md"
        onClick={() => {
          setLoadingUser(userId as string);
          mutateUserFollow(userId as string);
        }}
        disabled={loadingUser === userId && isLoadingUnfollow}
      >
        Follow back
      </Button>
    );
  }

  return <></>;
};

export default ProfileFollowers;
