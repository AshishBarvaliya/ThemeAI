import React, { useRef, useEffect } from "react";

interface Props {
  width: number;
  height: number;
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  id: string;
}

const CanvasComponent: React.FC<Props> = ({ id, width, height, onDraw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        onDraw(ctx);
      }
    }
  }, [onDraw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      id={id}
      className="border border-border"
    />
  );
};

export default CanvasComponent;
