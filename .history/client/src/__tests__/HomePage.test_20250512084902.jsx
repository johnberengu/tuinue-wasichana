import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";

test("renders hero section", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const heading = screen.getByText(/empower girls/i);
  expect(heading).toBeInTheDocument();
});
