import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { followUser, getUser, unfollowUser } from "@/services/user";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";
import { useRouter } from "next/router";
import Typography from "@/components/ui/typography";
import { Building, MapPin, User2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileThemes from "@/components/profile-themes";
import ProfileFollowers from "@/components/profile-followers";
import ProfileFollowing from "@/components/profile-following";
import { useSession } from "next-auth/react";
import { useHelpers } from "@/hooks/useHelpers";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { UserProps } from "@/interfaces/user";

export default function User() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { runIfLoggedInElseOpenLoginDialog, setLoginOpen } = useHelpers();
  const { data: session } = useSession();

  const { data: user } = useQuery(["user", router.query.id], () =>
    getUser(router.query.id as string)
  );
  const { mutate: mutateUserFollow, isLoading: isLoadingFollow } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: ({ followerId, followingId }) => {
      queryClient.invalidateQueries(["user", router.query.id]);
      if (user) {
        if (router.query.id !== followerId) {
          queryClient.setQueryData(["user", router.query.id], {
            ...user,
            followers: [...user.followers, { followerId }],
          });
        } else {
          queryClient.setQueryData(["user", router.query.id], {
            ...user,
            following: [...user.following, { followingId }],
          });
        }
      }
    },
  });
  const { mutate: mutateUserUnfollow, isLoading: isLoadingUnfollow } =
    useMutation({
      mutationFn: (userId: string) => unfollowUser(userId),
      onSuccess: ({ followerId, followingId }) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        if (user) {
          if (router.query.id !== followerId) {
            queryClient.setQueryData(["user", router.query.id], {
              ...user,
              followers: user.followers.filter(
                (follower) => follower.followerId !== followerId
              ),
            });
          } else {
            queryClient.setQueryData(["user", router.query.id], {
              ...user,
              following: user.following.filter(
                (following) => following.followingId !== followingId
              ),
            });
          }
        }
      },
    });
  const [selectedNav, setSelectedNav] = useState("Themes");

  useEffect(() => {
    setSelectedNav("Themes");
  }, [router.query.id]);

  const renderButton = (
    session: Session | null,
    user: UserProps | undefined
  ) => {
    if (session?.user?.id === user?.id) {
      return (
        <Button
          className="my-4 w-full"
          onClick={() => router.push("/settings")}
        >
          Edit profile
        </Button>
      );
    }
    if (session && user) {
      const isFollower = user.following?.find(
        (following) => following.followingId === session?.user?.id
      );
      const isFollowing = user.followers?.find(
        (follower) => follower.followerId === session?.user?.id
      );

      return (
        <Button
          className="my-4 w-full"
          onClick={() =>
            isFollowing
              ? mutateUserUnfollow(user?.id as string)
              : mutateUserFollow(user?.id as string)
          }
          variant={isFollowing ? "destructive" : "default"}
          disabled={isLoadingFollow || isLoadingUnfollow}
        >
          {isFollowing ? "Unfollow" : isFollower ? "Follow back" : "Follow"}
        </Button>
      );
    }
    return (
      <Button className="my-4 w-full" onClick={() => setLoginOpen(true)}>
        Follow
      </Button>
    );
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col fixed h-full border-border border-r-[0.5px] w-[300px] items-center shadow-lg">
        <div className="flex flex-col w-full p-6 items-center">
          <Avatar className="h-[200px] w-[200px] border-[0.5px] border-border shadow-md">
            {user?.avatar ? (
              <NiceAvatar
                className="h-[200px] w-[200px]"
                {...JSON.parse(user?.avatar)}
              />
            ) : (
              <>
                <AvatarImage src={user?.image} alt="profile image" />
                <AvatarFallback className="bg-primary text-primary-foreground text-[130px]">
                  {user?.name?.split(" ")[0][0]}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div className="flex flex-col mt-4 justify-center text-center">
            <Typography
              element="h3"
              as="h3"
              className="text-primary-foreground"
            >
              {user?.name || "-"}
            </Typography>
          </div>
          <div className="flex w-full justify-center items-center mt-4 mb-2">
            <Typography
              element="p"
              as="p"
              className="flex items-center text-md text-primary-foreground/90 cursor-pointer hover:text-secondary"
            >
              <span className="mr-2 font-semibold">
                {user?.followers ? user?.followers.length : 0}
              </span>
              Followers
            </Typography>
            <div className="w-[1px] h-full bg-border mx-4" />
            <Typography
              element="p"
              as="p"
              className="flex items-center text-md text-primary-foreground/90 cursor-pointer hover:text-secondary"
            >
              <span className="mr-2 font-semibold">
                {user?.following ? user?.following.length : 0}
              </span>
              Following
            </Typography>
          </div>
          {renderButton(session, user)}
          <div className="flex flex-col py-4 w-full px-4 text-sm">
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <User2 className="mr-2 h-4 w-4" /> {user?.title || "-"}
            </Typography>
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <Building className="mr-2 h-4 w-4" /> {user?.organization || "-"}
            </Typography>
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <MapPin className="mr-2 h-4 w-4" /> {user?.location || "-"}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full ml-[300px] bg-black/5">
        <div
          className="flex justify-between flex-col border-b-[0.5px] px-6 py-3 pb-1.5 border-border fixed bg-background z-10 shadow-md"
          style={{
            maxWidth: "calc(1536px - 300px)",
            width: "calc(100vw - 300px)",
          }}
        >
          <div className="flex w-full">
            <div className="flex gap-2">
              {["Themes", "Followers", "Following"].map((tab, index) => (
                <Label
                  key={index}
                  className={cn(
                    "flex relative px-3 py-3 cursor-pointer hover:bg-primary/25 font-semibold",
                    {
                      "bg-background text-secondary": selectedNav === tab,
                    }
                  )}
                  onClick={() => {
                    if (tab === "Followers" || tab === "Following") {
                      runIfLoggedInElseOpenLoginDialog(() =>
                        setSelectedNav(tab)
                      );
                    } else setSelectedNav(tab);
                  }}
                >
                  {tab}
                  {selectedNav === tab && (
                    <div className="absolute -bottom-[7px] -ml-3 h-[3px] w-full bg-secondary" />
                  )}
                </Label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[56px] overflow-y-auto flex-1">
          {selectedNav === "Themes" ? (
            <ProfileThemes />
          ) : selectedNav === "Followers" ? (
            <ProfileFollowers user={user} />
          ) : selectedNav === "Following" ? (
            <ProfileFollowing user={user} />
          ) : selectedNav === "Purchases" ? (
            <>Purchases</>
          ) : selectedNav === "Experiences" ? (
            <>Experiences</>
          ) : null}
        </div>
      </div>
    </div>
  );
}
