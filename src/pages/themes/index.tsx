import LearningTemplate from "@/assets/templates/learning/learning-mini";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import {
  ColorsProps,
  FontObjProps,
  GetThemeTileProps,
  TagProps,
} from "@/interfaces/theme";
import { generateAllShades, getLuminance } from "@/lib/utils";
import { getThemes } from "@/services/theme";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Heart } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";

interface MappedThemeProps {
  id: string;
  name: string;
  colors: ColorsProps;
  fonts: FontObjProps;
  tags: TagProps[];
  createdAt?: Date;
  user: {
    id: string;
    name: string;
    avatar: string;
    image: string;
  };
  likes: number;
  saves: number;
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

export default function Themes() {
  const router = useRouter();
  const [copied, setCopied] = useState<null | string>(null);
  const { data: session } = useSession();
  const [themes, setThemes] = useState<MappedThemeProps[]>([]);

  useEffect(() => {
    getThemes().then((res) => {
      setThemes(res.map((t: GetThemeTileProps) => getMappedTheme(t)));
      console.log(res);
    });
  }, []);

  return (
    <div className="flex p-10 gap-8">
      {themes.map((theme, index) => (
        <div
          key={index}
          className="w-[350px] h-fit border border-border flex flex-col shadow-lg bg-white"
        >
          <div className="flex gap-1 items-center p-2 border-b border-border ">
            <div className="flex flex-1 gap-2 items-center">
              <Avatar className="h-7 w-7 border border-border">
                {theme.user.avatar ? (
                  <NiceAvatar
                    className="h-7 w-7"
                    {...JSON.parse(theme.user.avatar)}
                  />
                ) : (
                  <>
                    <AvatarImage src={theme.user.image} alt="profile image" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {theme.user.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <p>{theme.user.name}</p>
            </div>
            <p className="text-xs" style={{ color: theme.colors.primary }}></p>
          </div>
          <div className=" cursor-pointer">
            <LearningTemplate
              colors={theme.colors}
              shades={generateAllShades(theme.colors)}
              fonts={theme.fonts}
            />
          </div>
          <div
            className="flex flex-col border-t p-2 gap-4"
            style={{ borderColor: theme.colors.primary }}
          >
            <Typography element={"p"} as="p" className="text-2xl">
              Vitamin water website
            </Typography>
            <div className="flex gap-2">
              {Object.keys(theme.colors).map((key) => {
                const clr = theme.colors[key as keyof ColorsProps];
                const { color: textColor, shade } = getLuminance(clr);
                return (
                  <div
                    key={key}
                    style={{
                      backgroundColor: clr,
                    }}
                    className="h-8 parent_hover w-full border border-border flex items-center justify-center"
                  >
                    <p
                      className="text-sm hidden_child cursor-pointer px-1"
                      style={{ color: textColor, backgroundColor: shade }}
                      onClick={() => {
                        navigator.clipboard.writeText(clr);
                        setCopied(theme.id + clr);
                        setTimeout(() => {
                          setCopied(null);
                        }, 1000);
                      }}
                    >
                      {copied === theme.id + clr ? "Copied!" : clr}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1">
              {theme.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center border border-border px-2 rounded-[45px] text-sm"
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="flex gap-1 items-center">
              <div className="flex flex-1 gap-2 items-center">
                <Heart className="h-5 w-5 cursor-pointer hover:text-[red]" />
                {theme.likes}
              </div>
              <p className="text-xs text-secondary-foreground">
                {moment(theme.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
