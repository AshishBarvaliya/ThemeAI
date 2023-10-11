export const USER_LEVELS: Record<
  number,
  {
    svg: string;
    id: string;
    experiencesTitle: string;
    borderColor: string;
    name: string;
  }
> = {
  1: {
    id: "bronze",
    svg: "/svg/bronze.svg",
    name: "Bronze badge",
    experiencesTitle: "Novice creator",
    borderColor: "border-[#ee9e6c]",
  },
  2: {
    id: "silver",
    svg: "/svg/silver.svg",
    name: "Silver badge",
    experiencesTitle: "Junior creator",
    borderColor: "border-[#ABABB8]",
  },
  3: {
    id: "gold",
    svg: "/svg/gold.svg",
    name: "Gold badge",
    experiencesTitle: "Intermediate creator",
    borderColor: "border-[#F9DDA1]",
  },
  4: {
    id: "diamond",
    svg: "/svg/diamond.svg",
    name: "Diamond badge",
    experiencesTitle: "Experienced creator",
    borderColor: "border-[#CE9CFF]",
  },
  5: {
    id: "emerald",
    svg: "/svg/emerald.svg",
    name: "Emerald badge",
    experiencesTitle: "Expert creator",
    borderColor: "border-[#61DF61]",
  },
};
