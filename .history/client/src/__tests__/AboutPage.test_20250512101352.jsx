import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import AboutPage from "../pages/public/AboutPage.jsx";

test("renders the About Us section title", () => {
  render(<AboutPage />);

  const title = screen.getByText(/about us/i);
  expect(title).toBeInTheDocument();
});
