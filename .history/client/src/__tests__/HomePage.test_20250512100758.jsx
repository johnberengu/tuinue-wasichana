import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";

test("renders hero section with the correct heading", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  const heading = screen.getByText(
    /igniting dreams, forging futures for girls/i
  );
  expect(heading).toBeInTheDocument();
});
