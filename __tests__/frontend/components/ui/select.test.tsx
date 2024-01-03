import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/select"; // Adjust the import path

describe("Select Components", () => {
  test("Select renders and opens correctly", () => {
    render(
      <Select>
        <SelectTrigger>Choose an option</SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Choose an option"));
  });

  test("SelectItem can be selected", () => {
    render(
      <Select>
        <SelectValue>Selected Value</SelectValue>
        <SelectTrigger>Choose an option</SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Choose an option"));
    expect(screen.getByText("Selected Value")).toBeInTheDocument();
  });

  test("SelectLabel renders correctly", () => {
    render(
      <Select>
        <SelectGroup>
          <SelectLabel>Label</SelectLabel>
        </SelectGroup>
      </Select>
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  test("SelectSeparator renders correctly", () => {
    render(
      <Select>
        <SelectTrigger>Choose an option</SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectSeparator />
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Choose an option"));
  });
});
