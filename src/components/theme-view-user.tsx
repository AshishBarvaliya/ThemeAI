import { AwardIcon } from "@/components/award-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_LEVELS } from "@/constants/user";
import { DotFilledIcon } from "@radix-ui/react-icons";
import NiceAvatar from "react-nice-avatar";
import Typography from "./ui/typography";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { ThemeVeiwProps } from "./theme-view";

export const ThemeViewUser: React.FC<{ theme: ThemeVeiwProps["theme"] }> = ({
  theme,
}) => {
  const router = useRouter();

  return theme.user ? (
    <div className="flex gap-3 border-[0.5px] border-border p-2 my-3 shadow-sm bg-white">
      <Avatar
        className="flex rounded-[6px] h-12 w-12 border-[0.5px] bg-primary border-border"
        onClick={() => router.push(`/user/${theme.user?.id}`)}
      >
        {theme.user.avatar ? (
          <NiceAvatar
            className="h-12 w-12 rounded-md"
            shape="square"
            {...JSON.parse(theme.user.avatar)}
          />
        ) : (
          <>
            <AvatarImage src={theme.user.image} alt="profile image" />
            <AvatarFallback className="flex bg-primary text-primary-foreground text-xl">
              {theme.user.name.split(" ")[0][0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center gap-2">
          <p className="text-lg">{theme.user.name}</p>
          <AwardIcon
            level={theme.user.level}
            className="h-5 w-5"
            info={USER_LEVELS[theme.user.level].name}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Typography element={"p"} as="p" className="text-xs">
              {theme.user.createdThemes?.length}
              <span className="text-primary-foreground/70 ml-1">Themes</span>
            </Typography>
            <DotFilledIcon className="h-3 w-3" />
            <Typography element={"p"} as="p" className="text-xs">
              {theme.user.experience}
              <span className="text-primary-foreground/70 ml-1">
                Experiences
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          size="md"
          onClick={() => router.push("/user/" + theme.user?.id)}
        >
          View
        </Button>
      </div>
    </div>
  ) : null;
};
