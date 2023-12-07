import { USER_LEVELS } from "@/constants/user";
import { AwardIcon } from "./award-icon";

interface LevelProgressProps {
  level: number;
  experiences: number;
  setOpenRewardDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  experiences,
  setOpenRewardDialog,
}) => {
  return level < 5 ? (
    <div className="flex w-full md:w-[300px] lg:w-full mt-3 flex-col">
      <div className="flex w-full items-center">
        <AwardIcon
          className="h-5 w-5"
          level={level}
          info={USER_LEVELS[level].experiencesTitle}
          zeroRing
        />
        <div className="flex mx-2 flex-1 bg-white drop-shadow border-[0.5px] border-border h-3 w-full rounded-3xl">
          <div
            className={`h-full rounded-3xl`}
            style={{
              width: `${
                ((experiences - USER_LEVELS[level].requiredExperience) /
                  (USER_LEVELS[level + 1].requiredExperience -
                    USER_LEVELS[level].requiredExperience)) *
                100
              }%`,
              backgroundColor: USER_LEVELS[level].bgColor,
            }}
          />
        </div>
        <AwardIcon
          className="h-5 w-5"
          level={level + 1}
          tooltipClassName="mr-6"
          info={USER_LEVELS[level + 1].experiencesTitle}
        />
      </div>
      <div className="flex w-full items-center justify-between mt-1">
        <p className="text-primary-foreground text-xs">{experiences}</p>
        <p className="text-primary-foreground text-xs">
          Rewards:{" "}
          <span
            className="underline cursor-pointer hover:text-secondary font-bold"
            onClick={() => setOpenRewardDialog(true)}
          >
            Free prompts
          </span>
        </p>
        <p className="text-primary-foreground text-xs">
          {USER_LEVELS[level + 1].requiredExperience}
        </p>
      </div>
    </div>
  ) : null;
};
