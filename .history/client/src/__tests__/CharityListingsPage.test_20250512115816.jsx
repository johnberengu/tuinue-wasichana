import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharityListingsPage from "../pages/public/CharityListingsPage";

test("displays list of charities", () => {
  render(
    <MemoryRouter>
      <CharityListingsPage />
    </MemoryRouter>
  );

  const heading = screen.getByText(/charity listings/i);
  expect(heading).toBeInTheDocument();
});
