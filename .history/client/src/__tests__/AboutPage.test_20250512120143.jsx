import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import AboutPage from "../pages/public/AboutPage.jsx";

describe("AboutPage component", () => {
  test("renders the About Us section title", () => {
    render(<AboutPage />);
    const title = screen.getByText(/about us/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the mission statement section", () => {
    render(<AboutPage />);
    const mission = screen.getByText(/our mission/i);
    expect(mission).toBeInTheDocument();
  });

  test("renders the team section", () => {
    render(<AboutPage />);
    const team = screen.getByText(/meet our team/i);
    expect(team).toBeInTheDocument();
  });
});
