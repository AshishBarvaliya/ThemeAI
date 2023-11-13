import Typography from "@/components/ui/typography";
import { getAllFollowings, unfollowUser } from "@/services/user";
import NiceAvatar from "react-nice-avatar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FollowUserProps, UserProps } from "@/interfaces/user";
import { NextRouter, useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AwardIcon } from "./award-icon";
import { USER_LEVELS } from "@/constants/user";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { EmptyState } from "./empty-state";
import { User2 } from "lucide-react";

interface ProfileFollowingProps {
  user: UserProps | undefined;
}

const ProfileFollowing: React.FC<ProfileFollowingProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const { data: followings, isLoading: isLoadingFollwings } = useQuery(
    ["following", router.query.id],
    () => getAllFollowings(router.query.id as string),
    {
      enabled: !!router.query.id,
    }
  );

  const { mutate: mutateUserUnfollow, isLoading: isLoadingFollow } =
    useMutation({
      mutationFn: (userId: string) => unfollowUser(userId),
      onSuccess: ({ followingId }) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        queryClient.invalidateQueries(["following", router.query.id]);
        if (user) {
          queryClient.setQueryData(["user", router.query.id], {
            ...user,
            following: user.following.filter(
              (following) => following.followingId !== followingId
            ),
          });
        }
      },
    });

  return (
    <div className="flex h-full flex-col mt-4 gap-3 px-4 w-[75%]">
      {isLoadingFollwings ? (
        <div className="flex justify-center items-center flex-1 h-full">
          Loading...
        </div>
      ) : followings?.length === 0 ? (
        <EmptyState
          icon={<User2 className="w-6 h-6" />}
          title={
            user?.id === session?.user?.id
              ? "You don't follow anyone"
              : `${user?.name} doesn't follow anyone`
          }
        />
      ) : (
        followings?.map((user) => (
          <UserTile
            key={user.id}
            user={user}
            button={renderFollowStatusButton(
              session?.user?.id,
              user.id,
              router,
              mutateUserUnfollow,
              loadingUser,
              setLoadingUser,
              isLoadingFollow
            )}
          />
        ))
      )}
    </div>
  );
};

export const UserTile = ({
  user,
  button,
}: {
  user: FollowUserProps;
  button: JSX.Element | null;
}) => {
  const router = useRouter();

  return (
    <div
      key={user.id}
      className="flex border-[0.5px] border-border p-1 fade-in-0 animate-in slide-in-from-top-2 bg-white"
    >
      <Avatar className="h-12 w-12 border-[0.5px] border-border rounded-[6px]">
        {user.avatar ? (
          <NiceAvatar
            className="h-12 w-12 rounded-md"
            {...JSON.parse(user.avatar)}
            shape="square"
          />
        ) : (
          <>
            <AvatarImage src={user.image} alt="profile image" />
            <AvatarFallback className="bg-primary text-primary-foreground text-3xl rounded-md">
              {user.name?.split(" ")[0][0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex justify-between flex-1">
        <div className="flex flex-col ml-3 justify-between">
          <div className="flex items-center gap-2">
            {user.name}
            {user?.level && (
              <AwardIcon
                className="h-3 w-3"
                level={user.level}
                info={USER_LEVELS[user.level].name}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Typography element={"p"} as="p" className="text-xs">
              {user.createdThemes}
              <span className="text-primary-foreground/70 ml-1">Themes</span>
            </Typography>
            <DotFilledIcon className="h-3 w-3" />
            <Typography element={"p"} as="p" className="text-xs">
              {user.experience}
              <span className="text-primary-foreground/70 ml-1">
                Experiences
              </span>
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-2">
          {button}
          <Button size="md" onClick={() => router.push("/user/" + user.id)}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

const renderFollowStatusButton = (
  sessionUserId: string | undefined,
  userId: string | undefined,
  router: NextRouter,
  mutateUserUnfollow: (id: string) => void,
  loadingUser: string | null,
  setLoadingUser: (id: string | null) => void,
  isLoadingFollow: boolean
) => {
  if (router.query.id === sessionUserId) {
    return (
      <Button
        size="md"
        onClick={() => {
          setLoadingUser(userId as string);
          mutateUserUnfollow(userId as string);
        }}
        variant={"outline"}
        disabled={loadingUser === userId && isLoadingFollow}
      >
        Following
      </Button>
    );
  }
  return <></>;
};

export default ProfileFollowing;
