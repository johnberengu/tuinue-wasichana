import { render, screen, waitFor } from "@testing-library/react";
import StoryPage from "../pages/public/StoryPage";

test("displays girl empowerment stories", async () => {
  render(<StoryPage />);

  await waitFor(() => {
    expect(screen.getByText(/real stories/i)).toBeInTheDocument();
  });
});
