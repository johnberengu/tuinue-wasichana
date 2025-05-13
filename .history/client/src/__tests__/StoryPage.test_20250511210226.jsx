import { render, screen } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage.jsx";

test("displays girl empowerment stories", () => {
  render(<StoryPage />);
  const storyHeading = screen.getByText(/real stories/i);
  expect(storyHeading).toBeInTheDocument();
});
