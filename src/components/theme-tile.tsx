import LearningTemplate from "@/assets/templates/learning/learning-mini";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import {
  ColorsProps,
  GetThemeTileProps,
  MappedThemeProps,
} from "@/interfaces/theme";
import { generateAllShades, getLuminance } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Heart } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import NiceAvatar from "react-nice-avatar";

interface ThemeTileProps {
  theme: GetThemeTileProps;
}

const getMappedTheme = (theme: GetThemeTileProps): MappedThemeProps => ({
  id: theme.id,
  name: theme.name,
  user: theme.user,
  colors: {
    bg: theme.color_1,
    primary: theme.color_2,
    accent: theme.color_3,
    extra: theme.color_4,
  },
  fonts: {
    primary: {
      fontFamily: theme.font_1,
      weights: [],
    },
    secondary: {
      fontFamily: theme.font_2,
      weights: [],
    },
  },
  tags: theme.tags.map((e) => ({ id: e.tag.id, name: e.tag.name })),
  createdAt: theme.createdAt,
  likes: theme._count.likedBy,
  saves: theme._count.savedBy,
});

export const ThemeTile: React.FC<ThemeTileProps> = ({ theme }) => {
  const [copied, setCopied] = useState<null | string>(null);

  const mappedTheme = getMappedTheme(theme);

  return (
    <div className="w-[270px] h-fit border-[0.5px] border-border flex flex-col shadow-lg bg-white">
      <div className="flex gap-1 items-center p-1 border-b-[0.5px] border-border ">
        <div className="flex flex-1 gap-2 items-center">
          <Avatar className="h-6 w-6 border-[0.5px] border-border">
            {mappedTheme.user.avatar ? (
              <NiceAvatar
                className="h-6 w-6"
                {...JSON.parse(theme.user.avatar)}
              />
            ) : (
              <>
                <AvatarImage src={mappedTheme.user.image} alt="profile image" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {mappedTheme.user.name.split(" ")[0][0]}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <p className="text-xs">{mappedTheme.user.name}</p>
        </div>
        <p
          className="text-xs"
          style={{ color: mappedTheme.colors.primary }}
        ></p>
      </div>
      <div className=" cursor-pointer">
        <LearningTemplate
          colors={mappedTheme.colors}
          shades={generateAllShades(mappedTheme.colors)}
          fonts={mappedTheme.fonts}
        />
      </div>
      <div
        className="flex flex-col border-t-[0.5px] p-1 gap-2"
        style={{ borderColor: mappedTheme.colors.primary }}
      >
        <Typography element={"p"} as="p" className="text-lg">
          {mappedTheme.name}
        </Typography>
        <div className="flex gap-2">
          {Object.keys(mappedTheme.colors).map((key) => {
            const clr = mappedTheme.colors[key as keyof ColorsProps];
            const { color: textColor, shade } = getLuminance(clr);
            return (
              <div
                key={key}
                style={{
                  backgroundColor: clr,
                }}
                className="h-6 parent_hover w-full border-[0.5px] border-border flex items-center justify-center"
              >
                <p
                  className="text-xs hidden_child cursor-pointer"
                  style={{ color: textColor, backgroundColor: shade }}
                  onClick={() => {
                    navigator.clipboard.writeText(clr);
                    setCopied(mappedTheme.id + clr);
                    setTimeout(() => {
                      setCopied(null);
                    }, 1000);
                  }}
                >
                  {copied === mappedTheme.id + clr ? "Copied!" : clr}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1">
          {mappedTheme.tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center border-[0.5px] border-border px-2 py-0.5 rounded-[45px] text-xs"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex flex-1 gap-2 items-center">
            <Heart className="h-5 w-5 cursor-pointer hover:text-[red]" />
            {mappedTheme.likes}
          </div>
          <p className="text-xs text-secondary-foreground">
            {moment(mappedTheme.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};
