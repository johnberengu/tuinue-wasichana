import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminRoutes from "../routes/AdminRoutes.jsx";
import { test, expect, vi } from "vitest";

// Mock components to simulate API calls or complex behavior if needed
vi.mock("../pages/admin/AdminDashboard", () => ({
  __esModule: true,
  default: () => <div>Admin Dashboard Content</div>,
}));
vi.mock("../pages/admin/CharityApproval", () => ({
  __esModule: true,
  default: () => <div>Charity Approval Content</div>,
}));
vi.mock("../pages/admin/SystemReports", () => ({
  __esModule: true,
  default: () => <div>System Reports Content</div>,
}));

const renderWithRouter = (initialEntries) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AdminRoutes />
    </MemoryRouter>
  );
};

test("renders AdminDashboard and interacts correctly", async () => {
  renderWithRouter(["/"]);
  await waitFor(() => {
    expect(screen.getByText(/admin dashboard content/i)).toBeInTheDocument();
  });
  // Add interaction tests here if applicable
});

test("renders CharityApproval and interacts correctly", async () => {
  renderWithRouter(["/charity-approval"]);
  await waitFor(() => {
    expect(screen.getByText(/charity approval content/i)).toBeInTheDocument();
  });
  // Add interaction tests here if applicable
});

test("renders SystemReports and interacts correctly", async () => {
  renderWithRouter(["/system-reports"]);
  await waitFor(() => {
    expect(screen.getByText(/system reports content/i)).toBeInTheDocument();
  });
  // Add interaction tests here if applicable
});
