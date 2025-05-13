import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharityRoutes from "../routes/CharityRoutes.jsx";
import CharityDashboard from "../pages/charity/CharityDashboard";
import BeneficiariesPage from "../pages/beneficiary/Beneficiary";
import InventoryPage from "../pages/inventory/Inventory";
import StoryManagement from "../pages/charity/StoryManagement";
import CharityDetails from "../pages/charity/CharityDetails";
import { test, expect } from "vitest";
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

test("renders CharityDetails at /charity-details", () => {
  renderWithRouter(["/charity-details"]);
  expect(screen.getByText(/charity details/i)).toBeInTheDocument();
});
