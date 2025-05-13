import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DonorRoutes from "../routes/DonorRoutes.jsx";
import { test, expect, vi } from "vitest";

vi.mock("../pages/donor/DonorDashboard", () => ({
  __esModule: true,
  default: () => <div>Donor Dashboard Content</div>,
}));
vi.mock("../pages/donor/DonationPage", () => ({
  __esModule: true,
  default: () => <div>Donation Page Content</div>,
}));
vi.mock("../pages/donor/DonationHistory", () => ({
  __esModule: true,
  default: () => <div>Donation History Content</div>,
}));
vi.mock("../pages/donor/BeneficiaryStory", () => ({
  __esModule: true,
  default: () => <div>Beneficiary Story Content</div>,
}));

const renderWithRouter = (initialEntries) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <DonorRoutes />
    </MemoryRouter>
  );
};

test("renders DonorDashboard and interacts correctly", async () => {
  renderWithRouter(["/123"]);
  await waitFor(() => {
    expect(screen.getByText(/donor dashboard content/i)).toBeInTheDocument();
  });
});

test("renders DonationPage and interacts correctly", async () => {
  renderWithRouter(["/123/donate/456"]);
  await waitFor(() => {
    expect(screen.getByText(/donation page content/i)).toBeInTheDocument();
  });
});

test("renders DonationHistory and interacts correctly", async () => {
  renderWithRouter(["/123/donation-history"]);
  await waitFor(() => {
    expect(screen.getByText(/donation history content/i)).toBeInTheDocument();
  });
});

test("renders BeneficiaryStory and interacts correctly", async () => {
  renderWithRouter(["/123/beneficiary-stories"]);
  await waitFor(() => {
    expect(screen.getByText(/beneficiary story content/i)).toBeInTheDocument();
  });
});
