import { render, screen } from "@testing-library/react";
import CharityListingsPage from "../components/CharityListingsPage";

test("displays list of charities", () => {
  render(<CharityListingsPage />);
  const listTitle = screen.getByText(/our featured charities/i);
  expect(listTitle).toBeInTheDocument();
});
