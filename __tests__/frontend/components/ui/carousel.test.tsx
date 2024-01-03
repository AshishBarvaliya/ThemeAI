import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Carousel from "@/components/ui/carousel";

describe("Carousel Component", () => {
  jest.useFakeTimers();

  test("renders children correctly", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("handles next and previous slide transitions", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    // Assuming the next button has a role or testId to select it
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    expect(screen.getByText("Slide 2")).toBeInTheDocument();

    // Assuming the prev button has a role or testId to select it
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("auto slides based on interval", () => {
    render(
      <Carousel autoSlide interval={2000}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("applies custom background color", () => {
    const bgColor = "#FF5733";
    render(
      <Carousel bgColor={bgColor}>
        <div>Slide 1</div>
      </Carousel>
    );

    const carousel = screen.getByTestId("carousel");
    expect(carousel).toHaveStyle(`backgroundColor: ${bgColor}`);
  });

  jest.useRealTimers();
});
