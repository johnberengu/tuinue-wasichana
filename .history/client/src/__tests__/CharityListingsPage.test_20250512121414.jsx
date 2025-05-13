import { render, screen, waitFor } from "@testing-library/react";
import CharityListingPage from "../pages/public/CharityListingPage.jsx";
import { test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            full_name: "Test Charity 1",
            image: "test1.jpg",
          },
          {
            id: 2,
            full_name: "Test Charity 2",
            image: "test2.jpg",
          },
        ]),
    })
  );
});

test("displays list of charities", async () => {
  render(
    <MemoryRouter>
      <CharityListingPage />
    </MemoryRouter>
  );
  await waitFor(() => {
    const charity1 = screen.getByText(/test charity 1/i);
    const charity2 = screen.getByText(/test charity 2/i);
    expect(charity1).toBeInTheDocument();
    expect(charity2).toBeInTheDocument();
  });
});
