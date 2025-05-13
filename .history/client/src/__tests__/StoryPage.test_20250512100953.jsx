import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage";

test("renders the girl empowerment stories section", async () => {
  render(<StoryPage />);

  await waitFor(() => {
    const heading = screen.getByText(/real stories/i);
    expect(heading).toBeInTheDocument();
  });
});
