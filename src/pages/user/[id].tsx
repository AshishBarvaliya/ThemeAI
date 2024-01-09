import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  followUser,
  getHasNewNotifications,
  getUser,
  getUserStats,
  unfollowUser,
} from "@/services/user";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";
import { useRouter } from "next/router";
import Typography from "@/components/ui/typography";
import { ArrowLeftIcon, Building, MapPin, User2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileThemes from "@/components/profile-themes";
import ProfileFollowers from "@/components/profile-followers";
import ProfileFollowing from "@/components/profile-following";
import { useSession } from "next-auth/react";
import { useHelpers } from "@/hooks/useHelpers";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { UserProps } from "@/interfaces/user";
import { USER_LEVELS } from "@/constants/user";
import { AwardIcon } from "@/components/award-icon";
import HeartIcon from "@/assets/icons/heart";
import { QuestionMarkCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import PeopleFillIcon from "@/assets/icons/people-fill";
import BrushIcon from "@/assets/icons/brush-icon";
import ProfileNotifications from "@/components/profile-notifications";
import ProfilePurchases from "@/components/profile-purchases";
import { LevelProgress } from "@/components/level-progress";
import { RewardDialog } from "@/components/reward-dialog";
import { RestrictedPage } from "@/components/restricted-page";
import Head from "next/head";
import { useToast } from "@/hooks/useToast";

export default function User() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const router = useRouter();
  const { runIfLoggedInElseOpenLoginDialog, setLoginOpen } = useHelpers();
  const { data: session } = useSession();
  const [openRewardDialog, setOpenRewardDialog] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["user", router.query.id],
    () => getUser(router.query.id as string),
    {
      enabled: !!router.query.id,
      onError: ({ response }) => {
        addToast({
          title: response.data?.error || "Something went wrong",
          type: "error",
          errorCode: response.status,
        });
      },
    }
  );
  const { data: statsData } = useQuery(
    ["user", router.query.id, "stats"],
    () => getUserStats(router.query.id as string),
    {
      enabled: !!router.query.id,
    }
  );
  const { data: notificationStatus } = useQuery(
    ["user", "notification", "new"],
    () => getHasNewNotifications(),
    {
      enabled: !!router.query.id && !!session,
    }
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
    onError: ({ response }) => {
      addToast({
        title: response.data?.error || "Something went wrong",
        type: "error",
        errorCode: response.status,
      });
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
      onError: ({ response }) => {
        addToast({
          title: response.data?.error || "Something went wrong",
          type: "error",
          errorCode: response.status,
        });
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
          className="my-3.5 w-full md:w-[350px] lg:w-full"
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
          className="my-3.5 w-full md:w-[350px] lg:w-full"
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
      <Button className="my-3.5 w-full" onClick={() => setLoginOpen(true)}>
        Follow
      </Button>
    );
  };
  const stats = [
    {
      title: "Followers",
      value: user?.followers?.length || 0,
      icon: <PeopleFillIcon className="h-4 w-4" />,
    },
    {
      title: "Following",
      value: user?.following?.length || 0,
      icon: <PeopleFillIcon className="h-4 w-4" />,
    },
    {
      title: "Experiences",
      value: user?.experience || 0,
      icon: <BrushIcon className="h-4 w-4" />,
      helper:
        session?.user?.id === user?.id ? (
          <QuestionMarkCircledIcon
            className="h-4 w-4 cursor-pointer hover:text-secondary"
            onClick={() => setOpenRewardDialog(true)}
          />
        ) : null,
    },
    {
      title: "Likes",
      value: statsData?.likes || 0,
      icon: <HeartIcon className="h-4 w-4 text-[red]" active />,
    },
    {
      title: "Saves",
      value: statsData?.saves || 0,
      icon: <StarFilledIcon className="h-4 w-4 text-warning" />,
    },
  ];

  const navigations = [
    {
      title: "Themes",
      component: <ProfileThemes />,
    },
    ...(user
      ? [
          {
            title: "Followers",
            component: <ProfileFollowers user={user} />,
          },
          {
            title: "Following",
            component: <ProfileFollowing user={user} />,
          },
        ]
      : []),
    ...(session?.user?.id === router.query.id
      ? [
          {
            title: "Purchases",
            component: <ProfilePurchases />,
          },
          {
            title: "Notifications",
            component: <ProfileNotifications />,
          },
        ]
      : []),
  ];

  const renderStats = () => (
    <div className="flex flex-col w-full py-3 border-t border-border/20">
      <Typography
        element="p"
        as="p"
        className="text-primary-foreground/90 font-bold mb-1"
      >
        Community Stats
      </Typography>
      {stats.map((stat, index) => (
        <div className="flex items-center gap-2" key={index}>
          {stat.icon}
          <Typography
            element="p"
            as="p"
            className="text-primary-foreground/70 font-medium mr-1"
          >
            {stat.title}
          </Typography>
          <Typography
            element="p"
            as="p"
            className="text-primary-foreground font-medium"
          >
            {stat.value}
          </Typography>
          {stat.helper}
        </div>
      ))}
    </div>
  );

  return user ? (
    <>
      <Head>
        <title property="og:title">{user.name} - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content={`Browse ${user.name} profile and theemes created by ${user.name} on ThemeAI`}
        />
        <meta property="og:image" content="/og/hero.png" />
        <meta
          property="og:url"
          content={`https://themeai.io/user/${user.id}`}
        />
      </Head>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex flex-col relative lg:fixed lg:h-full border-border border-r-[0.5px] w-full lg:w-[300px] items-center shadow-lg">
          <div className="flex flex-col w-full p-6 pt-4 pb-0 lg:pb-6 items-center overflow-y-auto">
            <div className="relative">
              <Button
                onClick={() => router.back()}
                size="md"
                className="bg-background absolute -ml-14 -mt-3"
                variant={"link"}
                aria-label="Go back"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1.5" />
              </Button>
              <Avatar
                className={cn(
                  "h-[190px] w-[190px] border-border shadow-md",
                  user?.level === 0 ? "border-[0.5px]" : "border-[3px]",
                  user?.level
                    ? USER_LEVELS[user?.level].borderColor
                    : "border-border"
                )}
              >
                {user?.avatar ? (
                  <NiceAvatar
                    className="h-[190px] w-[190px]"
                    {...JSON.parse(user?.avatar)}
                  />
                ) : (
                  <>
                    <AvatarImage src={user?.image} alt="profile image" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-[120px]">
                      {user?.name?.split(" ")[0][0]}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              {user?.level ? (
                <div className="absolute right-[6px] bottom-7">
                  <AwardIcon
                    className="h-[26px] w-[26px]"
                    level={user.level}
                    info={USER_LEVELS[user.level].name}
                  />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col mt-4 justify-center text-center">
              <Typography
                element="h3"
                as="h3"
                className="text-primary-foreground max-w-[250px] break-words"
              >
                {user?.name || "-"}
              </Typography>
              {user && user.level !== undefined ? (
                <div className="flex items-center justify-center">
                  <Typography
                    element="p"
                    as="p"
                    className="text-primary-foreground/80"
                  >
                    {USER_LEVELS[user.level].experiencesTitle}
                  </Typography>
                </div>
              ) : null}
            </div>
            {user &&
              user.level !== undefined &&
              user.id === session?.user?.id && (
                <LevelProgress
                  level={user?.level}
                  experiences={user?.experience}
                  setOpenRewardDialog={setOpenRewardDialog}
                />
              )}
            {renderButton(session, user)}
            <div className="flex flex-col py-2 w-full px-4 text-sm">
              <div className="flex items-center">
                <User2 className="mr-2 h-4 w-4 flex" />
                <Typography
                  element="p"
                  as="p"
                  className="text-primary-foreground/90 break-words max-w-[180px]"
                >
                  {user?.title || "-"}
                </Typography>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 flex" />
                <Typography
                  element="p"
                  as="p"
                  className="text-primary-foreground/90 break-words max-w-[180px]"
                >
                  {user?.organization || "-"}
                </Typography>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 flex" />
                <Typography
                  element="p"
                  as="p"
                  className="text-primary-foreground/90 break-words max-w-[180px]"
                >
                  {user?.location || "-"}
                </Typography>
              </div>
            </div>
            {renderStats()}
          </div>
        </div>
        <div className="flex flex-col w-full lg:ml-[300px] bg-black/5 flex-1 lg:flex-auto">
          <div className="flex justify-between flex-col border-b-[0.5px] px-6 py-3 pb-1.5 border-border lg:fixed bg-background z-10 shadow-md w-full lg:max-w-[calc(1536px-300px)] lg:w-[calc(100vw-300px)]">
            <div className="flex w-full overflow-x-auto md:overflow-x-visible">
              <div className="flex gap-2">
                {navigations.map((tab, index) => (
                  <Label
                    key={index}
                    className={cn(
                      "flex relative px-3 py-3 cursor-pointer hover:bg-primary/25 font-semibold",
                      {
                        "bg-background text-secondary":
                          selectedNav === tab.title,
                      }
                    )}
                    onClick={() => {
                      if (
                        (tab.title === "Followers" ||
                          tab.title === "Following") &&
                        session?.user.id !== user?.id
                      ) {
                        runIfLoggedInElseOpenLoginDialog(() =>
                          setSelectedNav(tab.title)
                        );
                      } else setSelectedNav(tab.title);
                    }}
                  >
                    {tab.title}
                    {selectedNav === tab.title && (
                      <div className="absolute -bottom-[7px] -ml-3 h-[3px] w-full bg-secondary" />
                    )}
                    {tab.title === "Notifications" &&
                    notificationStatus?.new ? (
                      <div className="absolute top-2 rounded-full w-[7px] h-[7px] bg-red-600 right-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      </div>
                    ) : null}
                  </Label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:mt-[56px] overflow-y-auto flex-1 mb-2">
            {navigations.find((tab) => tab.title === selectedNav)?.component}
          </div>
        </div>
        <RewardDialog
          open={openRewardDialog}
          setOpen={setOpenRewardDialog}
          userLevel={user?.level || 0}
        />
      </div>
    </>
  ) : isLoadingUser ? (
    <div className="flex justify-center items-center flex-1 h-full">
      Loading...
    </div>
  ) : (
    <RestrictedPage
      title={`There is no user found with id '${router.query.id}'`}
      errorCode={404}
    />
  );
}
