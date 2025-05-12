import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";

test("renders the Admin Dashboard heading", () => {
  render(<AdminDashboard />);

  const heading = screen.getByText(/admin dashboard/i);
  expect(heading).toBeInTheDocument();
});
