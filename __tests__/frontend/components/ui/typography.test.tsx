import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from "@/components/ui/typography";

describe("Typography Component", () => {
  const testText = "Test Typography";

  test.each`
    element         | as
    ${"h1"}         | ${"h1"}
    ${"h2"}         | ${"h2"}
    ${"h3"}         | ${"h3"}
    ${"h4"}         | ${"h4"}
    ${"h5"}         | ${"h5"}
    ${"h6"}         | ${"h6"}
    ${"p"}          | ${"p"}
    ${"blockquote"} | ${"blockquote"}
    ${"ul"}         | ${"ul"}
    ${"li"}         | ${"ul"}
    ${"div"}        | ${"lead"}
    ${"span"}       | ${"largeText"}
    ${"span"}       | ${"smallText"}
    ${"span"}       | ${"mutedText"}
  `("renders $element as $as variant", ({ element, as }) => {
    render(
      <Typography element={element} as={as}>
        {testText}
      </Typography>
    );
    expect(screen.getByText(testText).tagName.toLowerCase()).toBe(element);
  });

  test("applies custom class", () => {
    const customClass = "custom-class";
    render(
      <Typography element="p" className={customClass}>
        {testText}
      </Typography>
    );
    const typographyElement = screen.getByText(testText);
    expect(typographyElement).toHaveClass(customClass);
  });

  test("renders with additional HTML attributes", () => {
    render(
      <Typography element="p" id="customId">
        {testText}
      </Typography>
    );
    const typographyElement = screen.getByText(testText);
    expect(typographyElement).toHaveAttribute("id", "customId");
  });

  test("renders the correct text content", () => {
    render(<Typography element="p">{testText}</Typography>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
