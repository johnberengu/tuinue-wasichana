import { render, screen, waitFor } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage.jsx";
import { test, expect, describe } from "vitest";

describe("StoryPage component", () => {
  test("renders the girl empowerment stories section", async () => {
    render(<StoryPage />);

    await waitFor(() => {
      const heading = screen.getByText(/charity stories/i);
      expect(heading).toBeInTheDocument();
    });
  });
});
