import {
  describe, it, expect
} from "vitest";

import {
  render, screen
} from "@testing-library/react";

import {
  SignIn, SignUp
} from "../../src/components/AuthForm.jsx";

describe("Auth Forms Test", () => {
  it("should show sign in form", () => {
    render(<SignIn />);
    
    expect(screen.getByRole("heading", { name: "Sign In To Messaging App" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should show sign up form", () => {
    render(<SignUp />);
    expect(screen.getByRole("heading", { name: "Sign Up To Messaging App" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
