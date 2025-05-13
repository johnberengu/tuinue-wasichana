import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../pages/public/HomePage.jsx";

test("renders hero section", () => {
  render(<HomePage />);
  const heading = screen.getByText(/empower girls/i);
  expect(heading).toBeInTheDocument();
});
