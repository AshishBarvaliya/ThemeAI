import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import ToastComponent from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";

jest.mock("@/hooks/useToast");

describe("ToastComponent", () => {
  const mockRemoveToast = jest.fn();
  // @ts-ignore
  useToast.mockReturnValue({ removeToast: mockRemoveToast });

  const sampleToast = {
    id: 1,
    title: "Sample Toast",
    description: "This is a test toast",
    type: "success",
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders toast with title and description", () => {
    render(<ToastComponent toast={sampleToast as any} />);
    expect(screen.getByText(sampleToast.title)).toBeInTheDocument();
    expect(screen.getByText(sampleToast.description)).toBeInTheDocument();
  });

  test("calls removeToast after timeout", () => {
    render(<ToastComponent toast={sampleToast as any} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(mockRemoveToast).toHaveBeenCalledWith(sampleToast.id);
  });
});
