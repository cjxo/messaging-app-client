import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// https://stackoverflow.com/questions/75728532/error-message-uncaught-typeerror-cannot-destructure-property-basename-of-re
import { BrowserRouter } from "react-router-dom";
import User, { UserLiCard } from "../../src/routes/user.jsx";

describe("UserLiCard testing", () => {
  it("renders correctly when not already added", () => {
    render(
      <BrowserRouter>
        <UserLiCard
          username={"giggle"}
          userId={1}
          alreadyAdded={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("link").textContent).toBe("View Profile");

    const btn = screen.getByRole("button");
    expect(btn.textContent).toBe("Add To Chat");
    expect(btn.disabled).toBeFalsy(); 
  });

  it("renders correctly when already added", () => {
    render(
      <BrowserRouter>
        <UserLiCard
          username={"giggle"}
          userId={1}
          alreadyAdded={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("link").textContent).toBe("View Profile");

    const btn = screen.getByRole("button");
    expect(btn.textContent).toBe("Already Added");
    expect(btn.disabled).toBeTruthy();
  });
});

/*
describe("User route", () => {
  it("disabled button on click", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <User />
      </BrowserRouter>
    );

    const btn = screen.getAllByRole("button", { disabled: false });
    expect(btn).toHaveLength(2);
    for (let i = 0; i < )

    //await user.click(btn);

//    expect(btn.disabled).toBeTruthy();
  })
});*/
