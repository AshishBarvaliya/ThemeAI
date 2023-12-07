import HeartIcon from "@/assets/icons/heart";
import { Dialog, DialogContent } from "./ui/dialog";
import Typography from "./ui/typography";
import { StarFilledIcon } from "@radix-ui/react-icons";
import BrushIcon from "@/assets/icons/brush-icon";
import { USER_LEVELS } from "@/constants/user";
import NiceAvatar from "react-nice-avatar";
import { AwardIcon } from "./award-icon";
import { Check, Minus, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ExportThemeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userLevel: number;
}

export const RewardDialog: React.FC<ExportThemeDialogProps> = ({
  open,
  setOpen,
  userLevel,
}) => {
  const { data: session } = useSession();

  const experiencesList = [
    {
      component: (
        <div className="flex items-center">
          <span className="font-bold mr-1">+10</span> exp per theme you create{" "}
          <BrushIcon className="h-4 w-4 mx-1" />.
        </div>
      ),
    },
    {
      component: (
        <div className="flex items-center">
          <span className="font-bold mr-1">+15</span> exp per like
          <HeartIcon className="h-4 w-4 text-[red] mx-1" active /> you receive
          on your themes.
        </div>
      ),
    },
    {
      component: (
        <div className="flex items-center">
          <span className="font-bold mr-1">+15</span> exp per save
          <StarFilledIcon className="h-4 w-4 text-warning mx-1" />, you receive
          on your themes.
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 border max-w-fit border-border bg-white rounded-none overflow-x-auto">
        <div className="flex flex-col w-[660px]">
          <Typography element="h3" as="h3">
            Experiences and Rewards
          </Typography>
          <div className="flex flex-1 mt-3 flex-col">
            <Typography element="p" as="p" className="text-xl">
              Experiences:
            </Typography>
            <div className="flex flex-1 flex-col mt-3 gap-1">
              {experiencesList.map((exp, i) => (
                <div className="flex" key={i}>
                  {exp.component}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 mt-7 flex-col">
            <Typography element="p" as="p" className="text-xl">
              Rewards:
            </Typography>
            <div className="flex flex-1 mt-10 mb-6 items-center">
              {Object.keys(USER_LEVELS).map((level: any) => (
                <div
                  className="flex flex-col relative items-center gap-1"
                  style={{
                    width: level === "0" || level === "5" ? "90px" : "120px",
                  }}
                  key={level}
                >
                  <AwardIcon
                    className="h-7 w-7"
                    level={Number(level)}
                    info={USER_LEVELS[Number(level)].name}
                    ringClassName="h-[26px] w-[26px] border-4"
                    zeroRing
                  />
                  <div className="text-sm font-bold">
                    {USER_LEVELS[Number(level)].experiencesTitle.split(" ")[0]}
                  </div>
                  <div className="text-sm">
                    {USER_LEVELS[Number(level)].requiredExperience + " exp"}
                  </div>
                  <div className="text-xs">
                    {"+" + USER_LEVELS[Number(level)].prompts + " prompts"}
                  </div>
                  {Number(level) !== 5 ? (
                    <>
                      <MoveRight
                        className={cn("h-7 w-7 absolute top-0 -right-[30px]", {
                          "top-0 -right-8": Number(level) === 0,
                          "top-0 -right-5": Number(level) === 4,
                        })}
                      />
                      <Minus
                        className={cn("h-7 w-7 absolute top-0 right-[8px]", {
                          "top-0 -right-[3px]": Number(level) === 0,
                        })}
                      />
                      <Minus
                        className={cn("h-7 w-7 absolute top-0 -right-[9px]", {
                          "top-0 -right-3": Number(level) === 0,
                        })}
                      />
                    </>
                  ) : null}
                  {userLevel === Number(level) ? (
                    <>
                      <Avatar className="absolute -top-[30px] h-6 w-6 border border-primary">
                        {session?.user?.avatar ? (
                          <NiceAvatar
                            className="h-6 w-6"
                            {...JSON.parse(session?.user?.avatar)}
                          />
                        ) : (
                          <>
                            <AvatarImage
                              src={session?.user.image}
                              alt="profile image"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {session?.user.name?.split(" ")[0][0]}
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <Check className="-bottom-4 absolute h-4 w-4 text-green-600" />
                    </>
                  ) : userLevel > Number(level) ? (
                    <>
                      <div className="absolute -top-7 h-5 w-5 border-[4px] rounded-full border-primary" />
                      <div
                        className={cn(
                          "absolute -top-5 -right-[50px] h-1 w-[100px] bg-primary",
                          {
                            "-right-[50px] w-[85px]": Number(level) === 0,
                          }
                        )}
                      />
                      <Check className="-bottom-4 absolute h-4 w-4 text-green-600" />
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
