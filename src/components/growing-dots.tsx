import React from "react";

const GlowingBoxes = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden w-full min-h-screen">
      <div className="glowing">
        <span style={{ "--i": 1 } as any}></span>
        <span style={{ "--i": 2 } as any}></span>
        <span style={{ "--i": 3 } as any}></span>
      </div>

      <div className="glowing">
        <span style={{ "--i": 1 } as any}></span>
        <span style={{ "--i": 2 } as any}></span>
        <span style={{ "--i": 3 } as any}></span>
      </div>

      <div className="glowing">
        <span style={{ "--i": 1 } as any}></span>
        <span style={{ "--i": 2 } as any}></span>
        <span style={{ "--i": 3 } as any}></span>
      </div>

      <div className="glowing">
        <span style={{ "--i": 1 } as any}></span>
        <span style={{ "--i": 2 } as any}></span>
        <span style={{ "--i": 3 } as any}></span>
      </div>
    </div>
  );
};

export default GlowingBoxes;
