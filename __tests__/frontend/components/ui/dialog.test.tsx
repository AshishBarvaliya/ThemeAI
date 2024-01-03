import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

describe("DialogContent Component", () => {
  test("renders with children and handles close", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <div>Dialog Content</div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
  });

  test("DialogHeader renders with children", () => {
    render(<DialogHeader>Header Content</DialogHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });
  test("DialogFooter renders with children", () => {
    render(<DialogFooter>Footer Content</DialogFooter>);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  test("DialogTitle renders with children", () => {
    render(
      <Dialog>
        <DialogTitle>Title Content</DialogTitle>
      </Dialog>
    );
    expect(screen.getByText("Title Content")).toBeInTheDocument();
  });

  test("DialogDescription renders with children", () => {
    render(
      <Dialog>
        <DialogDescription>Description Content</DialogDescription>
      </Dialog>
    );
    expect(screen.getByText("Description Content")).toBeInTheDocument();
  });

  test("DialogTrigger opens the dialog", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });
});
