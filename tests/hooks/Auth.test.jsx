import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../src/hooks/Auth.jsx";

const TestComponent = () => {
  const { isLoading, token, signin, signup } = useAuth();
  return (
    <div>
      <span data-testid="loading">
        {isLoading ? "Loading..." : "Loaded"}
      </span>
      <span data-testid="token">
        {token}
      </span>
      <button data-testid="signin" onClick={signin}>
        Sign In
      </button>
      <button data-testid="signup" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
};

describe("Auth Context", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  // TODO: updating the test when implemented Auth in server
  it("provides the context values", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("Loaded");
    expect(screen.getByTestId("token")).toHaveTextContent("NAUR");
  });
});
