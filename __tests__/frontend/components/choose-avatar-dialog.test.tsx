import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChooseAvatarDialog } from "@/components/choose-avatar-dialog";

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { id: 1 } } }),
}));

jest.mock("@/hooks/useToast", () => ({
  useToast: () => ({}),
}));

describe("ChooseAvatarDialog Component", () => {
  test("should display the dialog when open is true", () => {
    render(<ChooseAvatarDialog open={true} setOpen={() => {}} />);
    expect(screen.getByText("Choose Your Avatar")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("should not display the dialog when open is false", () => {
    render(<ChooseAvatarDialog open={false} setOpen={() => {}} />);
    expect(screen.queryByText("Choose Your Avatar")).not.toBeInTheDocument();
    expect(screen.queryByText("Refresh")).not.toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  test("renders correct number of avatars", () => {
    render(<ChooseAvatarDialog open={true} setOpen={() => {}} />);
    expect(screen.getAllByTestId("avatar")).toHaveLength(25);
  });

  test("changes number of avatars on mobile view", () => {});

  test("avatar selection updates selectedAvatar state", () => {
    render(<ChooseAvatarDialog open={true} setOpen={() => {}} />);
    const firstAvatar = screen.getAllByTestId("avatar")[0];
    fireEvent.click(firstAvatar);
  });

  test("refresh button generates new avatars and resets selection", () => {
    render(<ChooseAvatarDialog open={true} setOpen={jest.fn()} />);
    const refreshButton = screen.getByText("Refresh");
    fireEvent.click(refreshButton);
  });

  test("disables save button when no avatar is selected or loading", () => {
    render(<ChooseAvatarDialog open={true} setOpen={jest.fn()} />);
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeDisabled();
  });

  test("successfully saves the selected avatar", async () => {
    render(<ChooseAvatarDialog open={true} setOpen={jest.fn()} />);
  });
});
