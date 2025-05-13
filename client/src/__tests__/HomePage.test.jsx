import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";

describe("HomePage component", () => {
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

  test("renders the featured programs section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Updated to match actual section title in component
    const featuredPrograms = screen.getAllByText(
      /our core pillars of empowerment/i
    );
    expect(featuredPrograms.length).toBeGreaterThan(0);
  });

  test("renders the testimonials section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Updated to match actual testimonials section title in component
    const testimonials = screen.getByText((content, element) => {
      return content.match(/voices of hope and transformation/i);
    });
    expect(testimonials).toBeInTheDocument();
  });
});
