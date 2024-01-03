import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { USER_LEVELS } from "@/constants/user";
import { AwardIcon } from "@/components/award-icon";
import { TooltipProvider } from "@/components/ui/tooltip";

describe("AwardIcon Component", () => {
  test.each([1, 2, 3, 4, 5])(
    "renders correctly for valid level %i",
    (level) => {
      render(
        <TooltipProvider>
          <AwardIcon level={level} info="Test Info" />
        </TooltipProvider>
      );
      expect(screen.getByAltText(USER_LEVELS[level].id)).toBeInTheDocument();
    }
  );

  test("renders zero ring for level 0 when zeroRing is true", () => {
    render(
      <TooltipProvider>
        <AwardIcon level={0} zeroRing={true} info="Test Info" />
      </TooltipProvider>
    );
    expect(screen.getByTestId("zero-ring")).toBeInTheDocument();
  });

  test("does not render for invalid levels", () => {
    const { container } = render(
      <TooltipProvider>
        <AwardIcon level={6} info="Test Info" />
      </TooltipProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("applies custom class names", () => {
    render(
      <TooltipProvider>
        <AwardIcon
          level={1}
          className="custom-class"
          tooltipClassName="tooltip-class"
          ringClassName="ring-class"
          info="Test Info"
        />
      </TooltipProvider>
    );
    expect(screen.getByAltText(USER_LEVELS[1].id)).toHaveClass("custom-class");
    const imageElement = screen.getByAltText(USER_LEVELS[1].id);
    expect(imageElement).toHaveClass("custom-class");
  });
});
