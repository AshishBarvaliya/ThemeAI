import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Separator } from "@/components/ui/separator";

describe("Separator Component", () => {
  test("renders a horizontal separator", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("h-[1px] w-full");
  });

  test("renders a vertical separator", () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("h-full w-[1px]");
  });

  test("applies custom class", () => {
    const customClass = "custom-class";
    render(<Separator className={customClass} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass(customClass);
  });
});
