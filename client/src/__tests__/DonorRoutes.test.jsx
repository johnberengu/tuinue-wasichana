import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DonorRoutes from "../routes/DonorRoutes.jsx";
import DonorDashboard from "../pages/donor/DonorDashboard";
import DonationPage from "../pages/donor/DonationPage";
import DonationHistory from "../pages/donor/DonationHistory";
import BeneficiaryStory from "../pages/donor/BeneficiaryStory";
import { test, expect } from "vitest";
import { Provider } from "react-redux";
import store from "../store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const renderWithRouter = (initialEntries) => {
  return render(
    <Provider store={store}>
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <MemoryRouter initialEntries={initialEntries}>
          <DonorRoutes />
        </MemoryRouter>
      </PayPalScriptProvider>
    </Provider>
  );
};

test("renders DonorDashboard at /:id", () => {
  renderWithRouter(["/123"]);
  expect(screen.getByText(/donor dashboard/i)).toBeInTheDocument();
});

test("renders DonationPage at /:donorId/donate/:charityId", () => {
  renderWithRouter(["/123/donate/456"]);
  expect(screen.getByText(/donation page/i)).toBeInTheDocument();
});

test("renders DonationHistory at /:id/donation-history", () => {
  renderWithRouter(["/123/donation-history"]);
  expect(screen.getByText(/donation history/i)).toBeInTheDocument();
});

test("renders BeneficiaryStory at /:id/beneficiary-stories", () => {
  renderWithRouter(["/123/beneficiary-stories"]);
  expect(screen.getByText(/beneficiary story/i)).toBeInTheDocument();
});
