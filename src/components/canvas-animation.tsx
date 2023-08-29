import React, { useEffect } from "react";

const CanvasAnimation: React.FC = () => {
  useEffect(() => {
    var c: any = document.getElementById("canv");
    var $ = c.getContext("2d");

    var col = function (
      x: any,
      y: any,
      r: string | number,
      g: string | number,
      b: string | number
    ) {
      $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      $.fillRect(x, y, 1, 1);
    };
    var R = function (x: number, y: number, t: number) {
      return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    };

    var G = function (x: number, y: number, t: number) {
      return Math.floor(
        192 +
          64 *
            Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      );
    };

    var B = function (x: number, y: number, t: number) {
      return Math.floor(
        192 +
          64 *
            Math.sin(
              5 * Math.sin(t / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };

    var t = 0;

    var run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + 0.05;
      window.requestAnimationFrame(run);
    };

    run();
  }, []);

  return <canvas id="canv" className="w-full h-full" width={30} height={6} />;
};

export default CanvasAnimation;
