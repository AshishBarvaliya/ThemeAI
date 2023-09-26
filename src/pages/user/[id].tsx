import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetThemeTileProps, TagProps } from "@/interfaces/theme";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";
import { useRouter } from "next/router";
import { ThemeTile } from "@/components/theme-tile";
import Typography from "@/components/ui/typography";
import { Building, LocateIcon, MapPin, User2 } from "lucide-react";

interface UserProps {
  id: string;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  location: string;
  image: string;
  _count: {
    createdThemes: number;
    likedThemes: number;
    savedThemes: number;
    following: number;
    followers: number;
  };
  createdThemes: GetThemeTileProps[];
  likedThemes: GetThemeTileProps[];
  savedThemes: GetThemeTileProps[];
  following: any[];
  followers: any[];
}

interface TabsProps {
  id: keyof UserProps["_count"];
  name: string;
  count: number;
}

const emptyUser = {
  id: "",
  name: "",
  avatar: "",
  title: "",
  organization: "",
  location: "",
  image: "",
  _count: {
    createdThemes: 0,
    likedThemes: 0,
    savedThemes: 0,
    following: 0,
    followers: 0,
  },
  createdThemes: [],
  likedThemes: [],
  savedThemes: [],
  following: [],
  followers: [],
};

export default function User() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] =
    useState<keyof UserProps["_count"]>("createdThemes");
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState<TagProps[]>([]);
  const [user, setUser] = useState<UserProps>(emptyUser);
  const [selectedNav, setSelectedNav] = useState("Themes");

  const tabs: TabsProps[] = [
    {
      id: "createdThemes",
      name: "Created",
      count: user?._count?.createdThemes || 0,
    },
    {
      id: "likedThemes",
      name: "Liked",
      count: user?._count?.likedThemes || 0,
    },
    {
      id: "savedThemes",
      name: "Saved",
      count: user?._count?.savedThemes || 0,
    },
  ];

  useEffect(() => {
    axios
      .get("/api/tags")
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUser(router.query.id as string).then((res) => {
      console.log(res.user);
      setUser(res.user);
    });
  }, [status, router]);

  return (
    <div className="flex w-full">
      <div className="flex flex-col fixed h-full border-border border-r w-[300px] items-center">
        <div className="flex flex-col m-6">
          <Avatar className="h-[230px] w-[230px] border border-border">
            {user?.avatar ? (
              <NiceAvatar
                className="h-[230px] w-[230px]"
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
              {user?.name}
            </Typography>
          </div>
          <div className="flex w-full justify-center items-center mt-4">
            <Typography
              element="p"
              as="p"
              className="flex items-center text-lg text-primary-foreground/90 cursor-pointer hover:text-secondary"
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
              className="flex items-center text-lg text-primary-foreground/90 cursor-pointer hover:text-secondary"
            >
              <span className="mr-2 font-semibold">
                {user?._count.following}
              </span>{" "}
              Following
            </Typography>
          </div>
          <div className="flex flex-col py-4 w-full px-4">
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <User2 className="mr-2 h-4 w-4" /> {user?.title}
            </Typography>
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <Building className="mr-2 h-4 w-4" /> {user?.organization}
            </Typography>
            <Typography
              element="p"
              as="p"
              className="flex items-center text-primary-foreground/90"
            >
              <MapPin className="mr-2 h-4 w-4" /> {user?.location}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full ml-[300px] bg-white">
        <div
          className="flex justify-between flex-col border-b px-6 py-3 pb-1.5 border-border fixed bg-background z-10"
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
                      "bg-background": selectedNav === tab,
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
        <div className="flex p-4 flex-col gap-4 mt-[67px] bg-background/40 flex-1">
          <div className="flex justify-between">
            <div className="flex gap-4">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTab(tab.id)}
                  className={cn(
                    "border border-border px-4 h-10 flex items-center font-md cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
                    {
                      "bg-primary": selectedTab === tab.id,
                    }
                  )}
                >
                  {`${tab.name}(${tab.count})`}
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="flex items-center gap-3">
                <Select onValueChange={setFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setFilter}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {user[selectedTab].map(
              (theme: GetThemeTileProps, index: number) => (
                <ThemeTile key={index} theme={theme} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
