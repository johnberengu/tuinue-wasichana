import { render, screen } from "@testing-library/react";
import DonationPage from "../Pagrs/public/DonationPage.jsx";

test("renders donation form title", () => {
  render(<DonationPage />);
  const formTitle = screen.getByText(/make a donation/i);
  expect(formTitle).toBeInTheDocument();
});
