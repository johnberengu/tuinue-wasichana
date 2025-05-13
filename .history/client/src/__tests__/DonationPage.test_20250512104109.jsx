import { render, screen, waitFor } from "@testing-library/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DonationPage from "../pages/public/DonationPage";
import { test, expect } from "vitest";

test("renders the donation form title", async () => {
  render(
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <DonationPage />
    </PayPalScriptProvider>
  );

  await waitFor(() => {
    const title = screen.getByText(/donation form/i);
    expect(title).toBeInTheDocument();
  });
});
