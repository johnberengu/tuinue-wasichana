import { render, screen } from "@testing-library/react";
import CharityListingsPage from "../pages/public/CharityListingsPage.jsx";

test("displays list of charities", () => {
  render(<CharityListingsPage />);
  const listTitle = screen.getByText(/our featured charities/i);
  expect(listTitle).toBeInTheDocument();
});
