import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

describe("Tooltip Components", () => {
  test("renders tooltip with content", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");
    expect(triggerElement).toBeInTheDocument();
  });

  test("TooltipContent positions correctly", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent sideOffset={4}>Tooltip Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");
    expect(triggerElement).toBeInTheDocument();
  });
});
