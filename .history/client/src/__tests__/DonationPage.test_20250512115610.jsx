import { render, screen, waitFor } from "@testing-library/react";
import DonationPage from "../pages/public/DonationPage.jsx";
import { test, expect, describe } from "vitest";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

describe("DonationPage component", () => {
  test("renders the donation form title", async () => {
    render(
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <DonationPage />
      </PayPalScriptProvider>
    );

    await waitFor(() => {
      const title = screen.getByText(/make a donation/i);
      expect(title).toBeInTheDocument();
    });
  });
});
