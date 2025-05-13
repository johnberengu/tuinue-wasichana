import { render, screen } from "@testing-library/react";
import CharityDetails from "../components/CharityDetails";

test("shows detailed charity info", () => {
  render(<CharityDetails />);
  const detailText = screen.getByText(/impact/i);
  expect(detailText).toBeInTheDocument();
});
