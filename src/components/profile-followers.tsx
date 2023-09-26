import { getAllFollowers } from "@/services/user";
import { useToast } from "@/hooks/useToast";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { UserTile } from "./profile-following";

export default function ProfileFollowers() {
  const { addToast } = useToast();
  const { data: followers } = useQuery(["followers"], getAllFollowers);

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
