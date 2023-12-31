import Skeleton from "react-loading-skeleton";

export const ThemeTileSkeleton = () => {
  return (
    <div className="flex flex-col w-[270px] bg-white opacity-80 border-[0.5px] border-border/40 shadow-lg">
      <div className="flex gap-1 items-center border-b-[0.5px] border-border/40 px-1 pb-1">
        <Skeleton circle width={23} height={23} />
        <Skeleton width={150} height={18} />
      </div>
      <Skeleton width={262} height={160} className="mx-1 mb-1" />
      <div className="flex border-t-[0.5px] border-border/40 h-[1px]" />
      <Skeleton width={150} height={28} className="mx-1 mb-1" />
      <div className="flex gap-2 m-1">
        <Skeleton width={58} height={24} />
        <Skeleton width={58} height={24} />
        <Skeleton width={58} height={24} />
        <Skeleton width={58} height={24} />
      </div>
      <div className="flex gap-2 items-center mx-1">
        <Skeleton width={80} height={20} style={{ borderRadius: 30 }} />
        <Skeleton width={50} height={20} style={{ borderRadius: 30 }} />
        <Skeleton width={58} height={20} style={{ borderRadius: 30 }} />
      </div>
      <div className="flex gap-2 m-1 justify-between items-center">
        <Skeleton width={58} height={22} />
        <Skeleton width={58} height={18} />
      </div>
    </div>
  );
};
