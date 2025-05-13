import { render, screen } from "@testing-library/react";
import CharityDetails from "../Pages/CharityDetails.jsx";

test("shows detailed charity info", () => {
  render(<CharityDetails />);
  const detailText = screen.getByText(/impact/i);
  expect(detailText).toBeInTheDocument();
});
