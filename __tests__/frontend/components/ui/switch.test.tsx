import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "@/components/ui/switch";

describe("Switch Component", () => {
  test("renders switch component", () => {
    render(<Switch />);
    const switchComponent = screen.getByRole("switch");
    expect(switchComponent).toBeInTheDocument();
  });

  test("toggles switch state on click", () => {
    render(<Switch />);
    const switchComponent = screen.getByRole("switch");
    fireEvent.click(switchComponent);
    expect(switchComponent).toBeChecked();
  });

  test("applies custom class", () => {
    const customClass = "custom-class";
    render(<Switch className={customClass} />);
    const switchComponent = screen.getByRole("switch");
    expect(switchComponent).toHaveClass(customClass);
  });
});
