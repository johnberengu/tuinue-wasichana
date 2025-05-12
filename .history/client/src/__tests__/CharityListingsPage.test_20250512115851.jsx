import { render, screen } from "@testing-library/react";
import CharityListingPage from "../pages/public/CharityListingPage.jsx";
import { test, expect } from "vitest";

test("displays list of charities", () => {
  render(<CharityListingPage />);
  const listTitle = screen.getByText(/our featured charities/i);
  expect(listTitle).toBeInTheDocument();
});
