import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

describe("Avatar Components", () => {
  test("Avatar renders with provided className", () => {
    render(<Avatar className="custom-avatar-class" />);
    const avatar = screen.getByRole("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("custom-avatar-class");
  });

  test.todo("AvatarImage renders with provided className and src");

  //   test("AvatarImage renders with provided className and src", () => {
  //     const testSrc = "https://theme-ai.vercel.app/logo2.png";
  //     render(
  //       <Avatar>
  //         <AvatarImage
  //           className="custom-image-class"
  //           src={testSrc}
  //           alt="Avatar"
  //         ></AvatarImage>
  //       </Avatar>
  //     );
  //     const avatarImage = screen.getByRole("img");
  //     expect(avatarImage).toBeInTheDocument();
  //     expect(avatarImage).toHaveClass("custom-image-class");
  //     expect(avatarImage).toHaveAttribute("src", testSrc);
  //   });

  test("AvatarFallback renders with provided className and children", () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback-class">
          Fallback
        </AvatarFallback>
      </Avatar>
    );
    const avatarFallback = screen.getByText("Fallback");
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveClass("custom-fallback-class");
  });
});
