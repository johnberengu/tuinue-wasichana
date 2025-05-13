import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharityRoutes from "../routes/CharityRoutes.jsx";
import CharityDashboard from "../pages/charity/CharityDashboard";
import BeneficiariesPage from "../pages/beneficiary/Beneficiary";
import InventoryPage from "../pages/inventory/Inventory";
import StoryManagement from "../pages/charity/StoryManagement";
import CharityDetails from "../pages/charity/CharityDetails";
import { test, expect, vi } from "vitest";
import { Provider } from "react-redux";
import store from "../store";

const renderWithRouter = (initialEntries) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <CharityRoutes />
      </MemoryRouter>
    </Provider>
  );
};

test("renders CharityDashboard at /:id", () => {
  renderWithRouter(["/123"]);
  expect(screen.getByText(/charity dashboard/i)).toBeInTheDocument();
});

test("renders BeneficiariesPage at /:id/beneficiaries", () => {
  renderWithRouter(["/123/beneficiaries"]);
  expect(screen.getByText(/beneficiaries/i)).toBeInTheDocument();
});

test("renders InventoryPage at /:id/inventory", () => {
  renderWithRouter(["/123/inventory"]);
  expect(screen.getByText(/inventory/i)).toBeInTheDocument();
});

test("renders StoryManagement at /:id/stories", () => {
  renderWithRouter(["/123/stories"]);
  expect(screen.getByText(/story management/i)).toBeInTheDocument();
});

const mockCharity = {
  id: 123,
  image: "/test-image.jpg",
  full_name: "Test Charity",
  description: "Test charity description",
  email: "test@example.com",
  contact: "1234567890",
  website_url: "http://testcharity.org",
};

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("/charities/123")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharity),
      });
    }
    return Promise.reject(new Error("Unknown URL"));
  });
});

test("renders CharityDetails at /charity-details/:id", async () => {
  renderWithRouter(["/charity-details/123"]);
  const charityName = await screen.findByText(/test charity/i);
  expect(charityName).toBeInTheDocument();
});
