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

    const featuredPrograms = screen.getAllByText((content) =>
      /featured programs/i.test(content)
    );
    expect(featuredPrograms.length).toBeGreaterThan(0);
  });

  test("renders the testimonials section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const testimonials = screen.getByText((content) =>
      /testimonials/i.test(content)
    );
    expect(testimonials).toBeInTheDocument();
  });
});
