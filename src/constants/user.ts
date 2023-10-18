export const USER_LEVELS: Record<
  number,
  {
    svg: string;
    id: string;
    experiencesTitle: string;
    borderColor: string;
    name: string;
    requiredExperience: number;
    bgColor: string;
    prompts: number;
  }
> = {
  0: {
    id: "unranked",
    svg: "",
    name: "Unranked",
    experiencesTitle: "Unranked",
    borderColor: "border-border",
    bgColor: "#303030",
    requiredExperience: 0,
    prompts: 10,
  },
  1: {
    id: "bronze",
    svg: "/svg/bronze.svg",
    name: "Bronze badge",
    experiencesTitle: "Novice creator",
    borderColor: "border-[#ee9e6c]",
    bgColor: "#ee9e6c",
    requiredExperience: 300,
    prompts: 5,
  },
  2: {
    id: "silver",
    svg: "/svg/silver.svg",
    name: "Silver badge",
    experiencesTitle: "Junior creator",
    borderColor: "border-[#ABABB8]",
    bgColor: "#ABABB8",
    requiredExperience: 800,
    prompts: 10,
  },
  3: {
    id: "gold",
    svg: "/svg/gold.svg",
    name: "Gold badge",
    experiencesTitle: "Intermediate creator",
    borderColor: "border-[#F9DDA1]",
    bgColor: "#F9DDA1",
    requiredExperience: 2000,
    prompts: 20,
  },
  4: {
    id: "diamond",
    svg: "/svg/diamond.svg",
    name: "Diamond badge",
    experiencesTitle: "Experienced creator",
    borderColor: "border-[#CE9CFF]",
    bgColor: "#CE9CFF",
    requiredExperience: 5000,
    prompts: 50,
  },
  5: {
    id: "emerald",
    svg: "/svg/emerald.svg",
    name: "Emerald badge",
    experiencesTitle: "Expert creator",
    borderColor: "border-[#61DF61]",
    bgColor: "#61DF61",
    requiredExperience: 10000,
    prompts: 100,
  },
};
