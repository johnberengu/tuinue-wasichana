import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "../routes/AdminRoutes.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CharityApproval from "../pages/admin/CharityApproval";
import SystemReports from "../pages/admin/SystemReports";
import { test, expect } from "vitest";

const renderWithRouter = (initialEntries) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AdminRoutes />
    </MemoryRouter>
  );
};

test("renders AdminDashboard at /", () => {
  renderWithRouter(["/"]);
  expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
});

test("renders CharityApproval at /charity-approval", () => {
  renderWithRouter(["/charity-approval"]);
  expect(screen.getByText(/charity approval/i)).toBeInTheDocument();
});

test("renders SystemReports at /system-reports", () => {
  renderWithRouter(["/system-reports"]);
  expect(screen.getByText(/system reports/i)).toBeInTheDocument();
});
