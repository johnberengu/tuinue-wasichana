import { render, screen, waitFor } from "@testing-library/react";
import CharityDetails from "../pages/CharityDetails.jsx";
import { test, expect } from "vitest";

test("renders detailed charity impact information", async () => {
  render(<CharityDetails />);

  await waitFor(() => {
    const detailText = screen.getByText(/impact/i); // case-insensitive match
    expect(detailText).toBeInTheDocument();
  });
});
