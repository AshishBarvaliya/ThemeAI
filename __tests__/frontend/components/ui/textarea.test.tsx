import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea Component", () => {
  test("renders textarea with label and errorMessage", () => {
    const label = "Test Label";
    const errorMessage = "Error message";
    render(
      <Textarea label={label} errorMessage={errorMessage} id="test-textarea" />
    );
    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  test("renders textarea with postElement", () => {
    const postElement = <div>Post Element</div>;
    render(<Textarea postElement={postElement} />);
    expect(screen.getByText("Post Element")).toBeInTheDocument();
  });

  test("applies custom class to textarea", () => {
    const customClass = "custom-textarea-class";
    render(<Textarea className={customClass} />);
    const textarea = screen.getByTestId("root-textarea");
    expect(textarea).toHaveClass(customClass);
  });
});
