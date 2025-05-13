import { render, screen, waitFor } from "@testing-library/react";
import CharityDetails from "../pages/public/CharityDetails.jsx";
import { test, expect, describe } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("CharityDetails component", () => {
  test("renders detailed charity impact information", async () => {
    render(
      <MemoryRouter>
        <CharityDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const detailText = screen.getByText(/impact/i); // case-insensitive match
      expect(detailText).toBeInTheDocument();
    });
  });
});
