import { getAllFollowers } from "@/services/user";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { UserTile } from "./profile-following";
import { useRouter } from "next/router";

export default function ProfileFollowers() {
  const router = useRouter();
  const { data: followers } = useQuery(["followers", router.query.id], () =>
    getAllFollowers(router.query.id as string)
  );

  const unfollow = async (id: string) => {};
  return (
    <div className="flex flex-col mt-4 gap-3 px-4 pr-[300px]">
      {followers?.map((user) => (
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
