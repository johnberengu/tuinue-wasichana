import { render, screen, waitFor } from "@testing-library/react";
import DonationPage from "../pages/public/DonationPage.jsx";
import { test, expect, describe } from "vitest";

describe("DonationPage component", () => {
  test("renders the donation form title", async () => {
    render(<DonationPage />);

    await waitFor(() => {
      const title = screen.getByText(/make a donation/i);
      expect(title).toBeInTheDocument();
    });
  });
});
