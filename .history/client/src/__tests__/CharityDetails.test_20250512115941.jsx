import { render, screen, waitFor } from "@testing-library/react";
import CharityDetails from "../pages/public/CharityDetails.jsx";
import { test, expect, describe, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("CharityDetails component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            full_name: "Test Charity",
            description: "This is a test charity impact description.",
            image: "test-image.jpg",
            email: "test@example.com",
            contact: "1234567890",
            website_url: "http://example.com",
          }),
      })
    );
  });

  test("renders detailed charity impact information", async () => {
    render(
      <MemoryRouter initialEntries={["/charities/1"]}>
        <Routes>
          <Route path="/charities/:id" element={<CharityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const detailTexts = screen.getAllByText(/test charity/i);
      expect(detailTexts.length).toBeGreaterThan(0);
      const description = screen.getByText(/impact description/i);
      expect(description).toBeInTheDocument();
    });
  });
});
