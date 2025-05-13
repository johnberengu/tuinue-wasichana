import { render, screen, waitFor } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage.jsx";
import { test, expect, describe, vi } from "vitest";

describe("StoryPage component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: "Charity Story 1" },
            { id: 2, title: "Charity Story 2" },
          ]),
      })
    );
  });

  test("renders the girl empowerment stories section", async () => {
    render(<StoryPage />);

    await waitFor(() => {
      const heading = screen.getByText(/charity stories/i);
      expect(heading).toBeInTheDocument();
    });
  });
});
