import Typography from "@/components/ui/typography";
import { getAllFollowings } from "@/services/user";
import NiceAvatar from "react-nice-avatar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { FollowUserProps } from "@/interfaces/user";
import { useRouter } from "next/router";

export default function ProfileFollowing() {
  const router = useRouter();
  const { data: followings } = useQuery(["following", router.query.id], () =>
    getAllFollowings(router.query.id as string)
  );

  const unfollow = async (id: string) => {};
  return (
    <div className="flex flex-col mt-4 gap-3 px-4 pr-[300px]">
      {followings?.map((user) => (
        <UserTile
          key={user.id}
          user={user}
          button={
            <Button
              size="md"
              onClick={() => unfollow(user.id)}
              variant={"outline"}
            >
              Unfollow
            </Button>
          }
        />
      ))}
    </div>
  );
}

export const UserTile = ({
  user,
  button,
}: {
  user: FollowUserProps;
  button: JSX.Element;
}) => (
  <div key={user.id} className="flex border-[0.5px] border-border p-1">
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
        <div>{user.name}</div>
        <Typography element={"p"} as="p" className="text-xs">
          {user.title}
        </Typography>
      </div>
      <div className="flex items-center mr-2">{button}</div>
    </div>
  </div>
);
