import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CanvasAnimation from "@/components/canvas-animation";

describe("CanvasAnimation Component", () => {
  beforeEach(() => {
    const mockCanvasContext = {
      fillStyle: null,
      fillRect: jest.fn(),
    } as unknown as any;
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);
  });

  test("renders canvas element", () => {
    render(<CanvasAnimation />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass("w-full h-full");
    expect(canvas).toHaveAttribute("width", "30");
    expect(canvas).toHaveAttribute("height", "6");
  });

  test("canvas context methods are called", () => {
    render(<CanvasAnimation />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");
  });
});
