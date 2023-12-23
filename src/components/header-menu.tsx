import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NiceAvatar from "react-nice-avatar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getHasNewNotifications, getUser } from "@/services/user";
import { buyPupa } from "@/services/stripe";

interface HeaderMenuProps {}

export const HeaderMenu: React.FC<HeaderMenuProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = useQuery(["user", session?.user.id], () =>
    getUser(session?.user.id as string)
  );

  const { data: notificationStatus } = useQuery(
    ["user", "notification", "new"],
    () => getHasNewNotifications(),
    {
      enabled: !!router.query.id && !!session,
    }
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          size="icon"
        >
          <Avatar className="h-8 w-8 border-[0.5px] border-border">
            {session?.user?.avatar ? (
              <NiceAvatar
                className="h-8 w-8"
                {...JSON.parse(session?.user?.avatar)}
              />
            ) : (
              <>
                <AvatarImage src={session?.user.image} alt="profile image" />
                <AvatarFallback className="bg-primary text-primary-foreground text-base">
                  {session?.user.name?.split(" ")[0][0]}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <p className="text-xs">
              Available prompts:
              <span className="font-bold px-1">{user?.pupa || 0}</span>
            </p>
            <Button
              onClick={() => {
                buyPupa().then(({ url }) => {
                  router.push(url);
                });
              }}
              size={"sm"}
            >
              Buy
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer items-center flex"
            onClick={() => router.push("/user/" + session?.user.id)}
          >
            Profile
            {notificationStatus?.new && (
              <span className="ml-4 h-4 flex items-center bg-red-100 text-red-600 border-[0.5px] border-red-500 rounded-[20px] px-1.5">
                <div className="text-[10px]">New</div>
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/settings")}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            Go to landing page
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
