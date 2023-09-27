import { getAllFollowers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { UserTile } from "./profile-following";
import { NextRouter, useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

interface ProfileFollowersProps {
  mutateUserFollowing: (id: string) => void;
  userFollowingStatus: string[] | undefined;
}

const ProfileFollowers: React.FC<ProfileFollowersProps> = ({
  mutateUserFollowing,
  userFollowingStatus,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: followers } = useQuery(["followers", router.query.id], () =>
    getAllFollowers(router.query.id as string)
  );

  return (
    <div className="flex flex-col mt-4 gap-3 px-4 pr-[300px]">
      {followers?.map((user) => (
        <UserTile
          key={user.id}
          user={user}
          button={renderFollowStatusButton(
            session?.user?.id,
            user.id,
            router,
            mutateUserFollowing,
            userFollowingStatus
          )}
        />
      ))}
    </div>
  );
};

export const renderFollowStatusButton = (
  sessionUserId: string | undefined,
  userId: string | undefined,
  router: NextRouter,
  mutateUserFollowing: (id: string) => void,
  userFollowingStatus: string[] | undefined
) => {
  if (router.query.id === sessionUserId) {
    const isFollowing = userFollowingStatus?.includes(userId as string);

    return (
      <Button
        size="md"
        onClick={() => mutateUserFollowing(userId as string)}
        variant={isFollowing ? "outline" : "default"}
      >
        {isFollowing ? "Following" : "Follow back"}
      </Button>
    );
  }

  return <></>;
};

export default ProfileFollowers;
