import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

describe("DropdownMenu Components", () => {
  test("DropdownMenu renders with content", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    fireEvent.click(screen.getByText("Trigger"));
  });

  test("DropdownMenuLabel displays label", () => {
    render(<DropdownMenuLabel>Label</DropdownMenuLabel>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  test("DropdownMenuSeparator is displayed", () => {
    render(
      <DropdownMenu>
        <DropdownMenuSeparator />
      </DropdownMenu>
    );
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });

  test("DropdownMenuShortcut displays shortcut text", () => {
    render(<DropdownMenuShortcut>Shortcut</DropdownMenuShortcut>);
    expect(screen.getByText("Shortcut")).toBeInTheDocument();
  });
});
