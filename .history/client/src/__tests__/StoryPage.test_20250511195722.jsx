import { render, screen } from "@testing-library/react";
import StoryPage from "../components/StoryPage";

test("displays girl empowerment stories", () => {
  render(<StoryPage />);
  const storyHeading = screen.getByText(/real stories/i);
  expect(storyHeading).toBeInTheDocument();
});
