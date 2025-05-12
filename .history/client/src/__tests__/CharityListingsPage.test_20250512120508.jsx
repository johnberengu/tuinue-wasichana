import { render, screen, waitFor } from "@testing-library/react";
import CharityListingPage from "../pages/public/CharityListingPage.jsx";
import { test, expect } from "vitest";

test("displays list of charities", async () => {
  render(<CharityListingPage />);
  await waitFor(() => {
    const listTitle = screen.getByText(/our featured charities/i);
    expect(listTitle).toBeInTheDocument();
  });
});
