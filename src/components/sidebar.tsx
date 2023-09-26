import React from "react";

const Sidebar = ({ width }: { width: string }) => {
  return (
    <div
      style={{ width: width }}
      className={`flex fixed flex-col bg-background justify-between h-screen pb-[74px] border-r-[0.5px] border-border`}
    ></div>
  );
};

export default Sidebar;
