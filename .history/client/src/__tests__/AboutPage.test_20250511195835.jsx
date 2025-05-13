import { render, screen } from "@testing-library/react";
import AboutPage from "../components/AboutPage";

test("renders About Us title", () => {
  render(<AboutPage />);
  const title = screen.getByText(/about us/i);
  expect(title).toBeInTheDocument();
});
