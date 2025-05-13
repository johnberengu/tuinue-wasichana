import { render, screen } from "@testing-library/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DonationPage from "../pages/public/DonationPage";

test("renders donation form title", () => {
  render(
    <PayPalScriptProvider>
      <DonationPage />
    </PayPalScriptProvider>
  );
  const title = screen.getByText(/donation form/i);
  expect(title).toBeInTheDocument();
});
