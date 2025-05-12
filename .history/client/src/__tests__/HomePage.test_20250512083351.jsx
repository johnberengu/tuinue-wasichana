import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "../pages/public/HomePage.jsx";

describe("HomePage", () => {
  it("renders hero section", () => {
    render(<HomePage />);
    const heading = screen.getByText(/empower girls/i);
    expect(heading).toBeInTheDocument();
  });
});
