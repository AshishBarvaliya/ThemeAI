import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";
import { useState } from "react";
import NiceAvatar from "react-nice-avatar";
import { useRouter } from "next/router";
import Typography from "@/components/ui/typography";
import { Building, MapPin, User2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProfileThemes from "@/components/profile-themes";
import ProfileFollowers from "@/components/profile-followers";
import ProfileFollowing from "@/components/profile-following";

export default function User() {
  const router = useRouter();
  const { data: user } = useQuery(["user", router.query.id], () =>
    getUser(router.query.id as string)
  );
  const [selectedNav, setSelectedNav] = useState("Themes");

  return (
    <div className="flex w-full">
      <div className="flex flex-col fixed h-full border-border border-r-[0.5px] w-[300px] items-center">
        <div className="flex flex-col w-full p-6 items-center">
          <Avatar className="h-[200px] w-[200px] border-[0.5px] border-border">
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
          <div className="flex w-full justify-center items-center mt-4">
            <Typography
              element="p"
              as="p"
              className="flex items-center text-md text-primary-foreground/90 cursor-pointer hover:text-secondary"
            >
              <span className="mr-2 font-semibold">
                {user?._count.followers}
              </span>{" "}
              Followers
            </Typography>
            <div className="w-[1px] h-full bg-border mx-4" />
            <Typography
              element="p"
              as="p"
              className="flex items-center text-md text-primary-foreground/90 cursor-pointer hover:text-secondary"
            >
              <span className="mr-2 font-semibold">
                {user?._count.following}
              </span>{" "}
              Following
            </Typography>
          </div>
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
      <div className="flex flex-col w-full ml-[300px] bg-white">
        <div
          className="flex justify-between flex-col border-b-[0.5px] px-6 py-3 pb-1.5 border-border fixed bg-background z-10"
          style={{
            maxWidth: "calc(1536px - 300px)",
            width: "calc(100vw - 300px)",
          }}
        >
          <div className="flex w-full">
            <div className="flex gap-2">
              {[
                "Themes",
                "Followers",
                "Following",
                "Purchases",
                "Experiences",
              ].map((tab, index) => (
                <Label
                  key={index}
                  className={cn(
                    "flex relative px-3 py-3 cursor-pointer hover:bg-primary/25",
                    {
                      "bg-background text-secondary": selectedNav === tab,
                    }
                  )}
                  onClick={() => setSelectedNav(tab)}
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
        <div className="flex flex-col mt-[56px] bg-background/10 flex-1">
          {selectedNav === "Themes" ? (
            <ProfileThemes />
          ) : selectedNav === "Followers" ? (
            <ProfileFollowers />
          ) : selectedNav === "Following" ? (
            <ProfileFollowing />
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
