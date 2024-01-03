import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

describe("Popover Components", () => {
  test("Popover opens and closes correctly", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.getByText("Open Popover");
    fireEvent.click(triggerButton);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    fireEvent.click(triggerButton);
  });

  test("PopoverContent renders with custom class", () => {
    const customClass = "custom-popover-class";
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className={customClass}>Popover Content</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.getByText("Open Popover");
    fireEvent.click(triggerButton);
    const popoverContent = screen.getByText("Popover Content");
    expect(popoverContent).toHaveClass(customClass);
  });
});
