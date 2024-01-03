import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { PasswordEye } from "@/components/password-eye";

describe("PasswordEye Component", () => {
  test("renders Eye icon when value is false", () => {
    render(<PasswordEye value={false} setValue={() => {}} />);
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  test("renders EyeOff icon when value is true", () => {
    render(<PasswordEye value={true} setValue={() => {}} />);
    expect(screen.getByTestId("eye-off-icon")).toBeInTheDocument();
  });

  test("toggles the icon and calls setValue with correct argument on click", () => {
    const mockSetValue = jest.fn();
    render(<PasswordEye value={false} setValue={mockSetValue} />);

    // Simulate a click
    fireEvent.click(screen.getByTestId("eye-icon"));

    // Verify the callback was called with the correct argument
    expect(mockSetValue).toHaveBeenCalledWith(true);

    // Rerender with the new value
    render(<PasswordEye value={true} setValue={mockSetValue} />);
    fireEvent.click(screen.getByTestId("eye-off-icon"));
    expect(mockSetValue).toHaveBeenCalledWith(false);
  });
});
