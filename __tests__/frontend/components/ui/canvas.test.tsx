import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import CanvasComponent from "@/components/ui/canvas";

describe("CanvasComponent", () => {
  const mockOnDraw = jest.fn();

  beforeEach(() => {
    mockOnDraw.mockClear();
  });

  test("renders a canvas with specified dimensions and ID", () => {
    const testProps = {
      id: "test-canvas",
      width: 100,
      height: 100,
      onDraw: mockOnDraw,
    };

    render(<CanvasComponent {...testProps} />);

    const canvas = screen.getByRole("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("width", "100");
    expect(canvas).toHaveAttribute("height", "100");
    expect(canvas).toHaveAttribute("id", "test-canvas");
  });
});
