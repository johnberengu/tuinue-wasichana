import { render, screen } from "@testing-library/react";
import AboutPage from "../pages/public/AboutPage.jsx";

test("renders About Us title", () => {
  render(<AboutPage />);
  const title = screen.getByText(/about us/i);
  expect(title).toBeInTheDocument();
});
