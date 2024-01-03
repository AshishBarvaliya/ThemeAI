import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Input, SeachBar } from "@/components/ui/input"; // Adjust the import path

describe("Input Component", () => {
  test("renders input with label and errorMessage", () => {
    const label = "Test Label";
    const errorMessage = "Error message";
    render(<Input label={label} errorMessage={errorMessage} id="test-input" />);
    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  test("renders input with postElement", () => {
    const postElement = <div>Post Element</div>;
    render(<Input postElement={postElement} />);
    expect(screen.getByText("Post Element")).toBeInTheDocument();
  });
});

describe("SeachBar Component", () => {
  test("calls onSearch with the correct value", () => {
    const handleSearch = jest.fn();
    render(<SeachBar onSearch={handleSearch} onRemoveCallback={jest.fn()} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleSearch).toHaveBeenCalledWith("test");
  });

  test("calls onRemoveCallback when cleared", () => {
    const handleRemove = jest.fn();
    render(<SeachBar onSearch={jest.fn()} onRemoveCallback={handleRemove} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    expect(handleRemove).toHaveBeenCalled();
  });

  test("renders hint for theme usecase", () => {
    render(
      <SeachBar
        usecase="theme"
        onSearch={jest.fn()}
        onRemoveCallback={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByText("Enter")).toBeInTheDocument();
  });
});
