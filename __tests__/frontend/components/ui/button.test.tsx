import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button, ButtonProps } from "@/components/ui/button";

describe("Button Component", () => {
  test("renders button correctly", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  test("applies default variant and size styles", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveClass("inline-flex");
  });

  const variants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "circle",
    "square",
  ];
  variants.forEach((variant) => {
    test(`applies ${variant} variant styles`, () => {
      render(
        <Button variant={variant as ButtonProps["variant"]}>{variant}</Button>
      );
    });
  });

  const sizes = ["default", "sm", "md", "lg", "icon", "circle"];
  sizes.forEach((size) => {
    test(`applies ${size} size styles`, () => {
      render(<Button size={size as ButtonProps["size"]}>{size}</Button>);
    });
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass("custom-class");
  });

  test("onClick handler is called when the button is clicked", () => {
    const handleClick = jest.fn(); // Create a mock function for the click handler
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button); // Simulate a click event on the button

    expect(handleClick).toHaveBeenCalledTimes(1); // Assert that the handler was called once
  });
});
