import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage";

test("renders the girl empowerment stories section with heading and story cards", async () => {
  render(<StoryPage />);

  // Wait for the heading to appear
  await waitFor(() => {
    expect(screen.getByText(/real stories/i)).toBeInTheDocument();
  });

  // Check for subheading or descriptive text if present
  const description = screen.getByText(/inspiring journeys of resilience/i, {
    exact: false,
  });
  expect(description).toBeInTheDocument();

  // Check for at least one story card or article element
  const storyCards = await screen.findAllByTestId("story-card");
  expect(storyCards.length).toBeGreaterThan(0);

  // Optional: Check if a known name or excerpt is visible (adjust as needed)
  expect(screen.getByText(/mary/i)).toBeInTheDocument();
});
