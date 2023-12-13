import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Typography from "./ui/typography";
import { COLORS_FORMAT, COLORS_TYPE } from "@/constants/theme";
import { cn, formatToTwoDecimalPlaces, hexToHSL, hexToRGB } from "@/lib/utils";
import { Button } from "./ui/button";
import { CopySlash, Download } from "lucide-react";
import { ColorsProps, FontObjProps } from "@/interfaces/theme";
import { useToast } from "@/hooks/useToast";
import CanvasComponent from "./ui/canvas";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

interface ExportThemeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  colors: ColorsProps;
  fonts: FontObjProps;
}

const colorMapping = {
  bg: "background",
  primary: "primary",
  accent: "accent",
  extra: "complementary",
};

const tohsl = (hex: string) => {
  const [h, s, l] = hexToHSL(hex);

  return `hsl(${formatToTwoDecimalPlaces(h)}, ${formatToTwoDecimalPlaces(
    s
  )}%, ${formatToTwoDecimalPlaces(l)}%)`;
};

const torgb = (hex: string) => {
  const { r, g, b } = hexToRGB(hex);

  return `rgb(${r}, ${g}, ${b})`;
};

export const ExportThemeDialog: React.FC<ExportThemeDialogProps> = ({
  open,
  setOpen,
  colors,
  fonts,
}) => {
  const { addToast } = useToast();
  const [colorFormat, setColorFormat] = useState(
    "CSS" as keyof typeof COLORS_FORMAT
  );
  const [colorType, setColorType] = useState("HEX" as keyof typeof COLORS_TYPE);

  const generatecolorVariable = (color: keyof ColorsProps) =>
    `${colorFormat === "CSS" ? "--" : colorFormat === "SCSS" ? "$" : "'"}${
      colorMapping[color as keyof ColorsProps]
    }${colorFormat === "TAILWIND" ? "'" : ""}: ${
      colorFormat === "TAILWIND" ? "'" : ""
    }${
      colorType === "HSL"
        ? tohsl(colors[color as keyof ColorsProps])
        : colorType === "RGB"
        ? torgb(colors[color as keyof ColorsProps])
        : colors[color as keyof ColorsProps]
    }${colorFormat === "TAILWIND" ? "'," : ";"}`;

  const handleDraw = (
    ctx: CanvasRenderingContext2D,
    scaleFactor: number = 1,
    forDownload?: boolean
  ) => {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 320 * scaleFactor, 180 * scaleFactor);

    ctx.fillStyle = colors.accent;
    ctx.font = `${10 * scaleFactor}px ${fonts.primary.fontFamily}`;
    ctx.fillText("Logo", 15 * scaleFactor, 25 * scaleFactor);

    ctx.fillStyle = colors.primary;
    ctx.font = `${6 * scaleFactor}px ${fonts.primary.fontFamily}`;
    ctx.fillText(
      "Home  |  Features  |  Pricing",
      220 * scaleFactor,
      25 * scaleFactor
    );

    ctx.fillStyle = colors.primary;
    ctx.font = `${18 * scaleFactor}px ${fonts.primary.fontFamily}`;
    ctx.fillText("Modern Website", 15 * scaleFactor, 90 * scaleFactor);

    ctx.fillStyle = colors.primary;
    ctx.font = `${7 * scaleFactor}px ${fonts.secondary.fontFamily}`;
    ctx.fillText(
      "Lorem ipsum dolor sit amet, consectetur",
      15 * scaleFactor,
      106 * scaleFactor
    );

    ctx.fillStyle = colors.primary;
    ctx.font = `${7 * scaleFactor}px ${fonts.secondary.fontFamily}`;
    ctx.fillText(
      "adipiscing elit, sed do eiusmod tempor",
      15 * scaleFactor,
      114 * scaleFactor
    );

    ctx.fillStyle = colors.accent;
    ctx.fillRect(
      15 * scaleFactor,
      130 * scaleFactor,
      28 * scaleFactor,
      14 * scaleFactor
    );
    ctx.fillStyle = colors.bg;
    ctx.font = `${6 * scaleFactor}px ${fonts.primary.fontFamily}`;
    ctx.fillText("Login", 21 * scaleFactor, 139 * scaleFactor);

    // Drawing overlapping squares
    ctx.fillStyle = colors.accent;
    ctx.fillRect(
      230 * scaleFactor,
      70 * scaleFactor,
      35 * scaleFactor,
      35 * scaleFactor
    );

    ctx.fillStyle = colors.accent;
    ctx.fillRect(
      265 * scaleFactor,
      105 * scaleFactor,
      35 * scaleFactor,
      35 * scaleFactor
    );

    ctx.fillStyle = colors.extra;
    ctx.fillRect(
      230 * scaleFactor,
      105 * scaleFactor,
      35 * scaleFactor,
      35 * scaleFactor
    );

    ctx.fillStyle = colors.extra;
    ctx.fillRect(
      265 * scaleFactor,
      70 * scaleFactor,
      35 * scaleFactor,
      35 * scaleFactor
    );

    // Strokes for squares
    ctx.strokeStyle = colors.primary;
    ctx.strokeRect(
      230 * scaleFactor,
      70 * scaleFactor,
      70 * scaleFactor,
      70 * scaleFactor
    );
    ctx.beginPath();
    ctx.moveTo(230 * scaleFactor, 105 * scaleFactor);
    ctx.lineTo(300 * scaleFactor, 105 * scaleFactor);
    ctx.moveTo(265 * scaleFactor, 70 * scaleFactor);
    ctx.lineTo(265 * scaleFactor, 140 * scaleFactor);
    ctx.stroke();

    if (forDownload) {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(
        188 * scaleFactor,
        163 * scaleFactor,
        10 * scaleFactor,
        10 * scaleFactor
      );

      ctx.fillStyle = "black";
      ctx.font = `${3 * scaleFactor}px Arial`;
      ctx.fillText(colors.bg, 200 * scaleFactor, 170 * scaleFactor);

      ctx.fillStyle = colors.primary;
      ctx.fillRect(
        218 * scaleFactor,
        163 * scaleFactor,
        10 * scaleFactor,
        10 * scaleFactor
      );

      ctx.fillStyle = "black";
      ctx.font = `${3 * scaleFactor}px Arial`;
      ctx.fillText(colors.primary, 230 * scaleFactor, 170 * scaleFactor);

      ctx.fillStyle = colors.accent;
      ctx.fillRect(
        248 * scaleFactor,
        163 * scaleFactor,
        10 * scaleFactor,
        10 * scaleFactor
      );

      ctx.fillStyle = "black";
      ctx.font = `${3 * scaleFactor}px Arial`;
      ctx.fillText(colors.accent, 260 * scaleFactor, 170 * scaleFactor);

      ctx.fillStyle = colors.extra;
      ctx.fillRect(
        278 * scaleFactor,
        163 * scaleFactor,
        10 * scaleFactor,
        10 * scaleFactor
      );

      ctx.fillStyle = "black";
      ctx.font = `${3 * scaleFactor}px Arial`;
      ctx.fillText(colors.extra, 290 * scaleFactor, 170 * scaleFactor);
    }
  };
  const downloadCanvas = () => {
    const displayCanvas = document.getElementById(
      "myCanvas"
    ) as HTMLCanvasElement;
    if (!displayCanvas) return;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1280;
    tempCanvas.height = 720;

    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    handleDraw(ctx, 4, true);

    const link = document.createElement("a");
    link.download = `ThemeGPT_Theme_${+new Date()}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 border max-w-fit border-border bg-white rounded-none">
        <div className="flex flex-col items-center w-[480px]">
          <Typography element="h3" as="h3">
            Export Theme
          </Typography>
          <div className="flex flex-1 mt-3">
            <Tabs defaultValue="colors" className="w-[480px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="fonts">Fonts</TabsTrigger>
              </TabsList>
              <TabsContent value="colors" className="h-[300px] py-1 px-1">
                <div className="flex gap-3">
                  {Object.keys(COLORS_FORMAT).map((key) => (
                    <div
                      key={key}
                      onClick={() =>
                        setColorFormat(key as keyof typeof COLORS_FORMAT)
                      }
                      className={cn(
                        "border-[0.5px] border-border px-3 h-7 flex items-center text-sm cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
                        {
                          "bg-primary": colorFormat === key,
                        }
                      )}
                    >
                      {COLORS_FORMAT[key as keyof typeof COLORS_FORMAT]}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-3">
                  {Object.keys(COLORS_TYPE).map((key) => (
                    <div
                      key={key}
                      onClick={() =>
                        setColorType(key as keyof typeof COLORS_TYPE)
                      }
                      className={cn(
                        "border-[0.5px] border-border px-3 h-7 flex items-center text-sm cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
                        {
                          "bg-primary": colorType === key,
                        }
                      )}
                    >
                      {COLORS_TYPE[key as keyof typeof COLORS_TYPE]}
                    </div>
                  ))}
                </div>
                {colorFormat === "IMAGE" ? (
                  <div className="flex justify-center mt-4">
                    <CanvasComponent
                      id="myCanvas"
                      width={320}
                      height={180}
                      onDraw={handleDraw}
                    />
                  </div>
                ) : (
                  <div className="h-[160px] border-[0.5px] border-border mt-4 bg-background pl-4 justify-center flex flex-col shadow-inset-bg">
                    {Object.keys(colors).map((color, index) => (
                      <div
                        key={index}
                        className="flex text-md"
                        style={{ fontFamily: "IBM Plex Mono" }}
                      >
                        {generatecolorVariable(color as keyof ColorsProps)}
                      </div>
                    ))}
                  </div>
                )}
                {colorFormat === "IMAGE" ? (
                  <Button className="mt-4" size={"md"} onClick={downloadCanvas}>
                    <Download className="mr-1.5 h-3 w-3" /> Download
                  </Button>
                ) : (
                  <Button
                    className="mt-4"
                    size={"md"}
                    onClick={() =>
                      navigator.clipboard
                        .writeText(
                          Object.keys(colors)
                            .map((color) =>
                              generatecolorVariable(color as keyof ColorsProps)
                            )
                            .join("\n")
                        )
                        .then(() =>
                          addToast({ title: "Copied!", type: "success" })
                        )
                        .catch(() =>
                          addToast({ title: "Failed to copy", type: "error" })
                        )
                    }
                  >
                    <CopySlash className="mr-1.5 h-3 w-3" /> Copy
                  </Button>
                )}
              </TabsContent>
              <TabsContent value="fonts" className="h-[300px] py-1 px-1">
                <div className="flex gap-3 flex-col">
                  {Object.keys(fonts).map((key) => (
                    <div
                      key={key}
                      className="flex border-[0.5px] border-border p-2 flex-col gap-3"
                    >
                      <div className="flex gap-2.5 items-center justify-between">
                        <Typography element="h4" as="h4">
                          {key === "primary"
                            ? "Primary Font"
                            : "Secondary Font"}
                        </Typography>
                        <div className="flex gap-2 items-center">
                          <Button
                            onClick={() =>
                              window.open(
                                `http://fonts.google.com/download?family=${
                                  fonts[key as keyof FontObjProps].fontFamily
                                }`,
                                "_blank"
                              )
                            }
                            size={"md"}
                          >
                            <Download className="mr-1.5 h-3 w-3" /> Download
                          </Button>
                          <Button
                            onClick={() =>
                              window.open(
                                `https://fonts.google.com/specimen/${
                                  fonts[key as keyof FontObjProps].fontFamily
                                }`,
                                "_blank"
                              )
                            }
                            size={"md"}
                          >
                            <OpenInNewWindowIcon className="mr-1.5 h-3 w-3" />{" "}
                            Open
                          </Button>
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily:
                            fonts[key as keyof FontObjProps].fontFamily,
                          backgroundColor:
                            key === "primary" ? "#f5dc98" : "#9ceeff",
                          wordBreak: "break-word",
                        }}
                        className="flex flex-col gap-1 relative p-1 h-[85px] w-full font-normal text-3xl text-center items-center justify-center border-[0.5px] border-border"
                      >
                        {fonts[key as keyof FontObjProps].fontFamily}
                        <p className="text-lg">
                          The quick brown fox jumps over a lazy dog.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
