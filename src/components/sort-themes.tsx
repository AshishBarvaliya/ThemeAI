import { SortByThemesProps } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SortThemesProps {
  setSortItem: React.Dispatch<
    React.SetStateAction<SortByThemesProps["sortBy"]>
  >;
}

interface ListProps {
  id: string;
  name: SortByThemesProps["sortBy"];
}

export const SortThemes: React.FC<SortThemesProps> = ({ setSortItem }) => {
  const list: ListProps[] = [
    {
      id: "newest",
      name: "Newest",
    },
    {
      id: "oldest",
      name: "Oldest",
    },
    {
      id: "liked",
      name: "Most Liked",
    },
    {
      id: "saved",
      name: "Most Saved",
    },
  ];
  return (
    <Select
      onValueChange={(value) =>
        setSortItem(value as SortByThemesProps["sortBy"])
      }
    >
      <SelectTrigger className="w-fit h-8 text-xs">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {list?.map((itm) => (
          <SelectItem key={itm.id} value={itm.name} className="text-xs">
            {itm.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
