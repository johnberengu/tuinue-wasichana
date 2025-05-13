import { render, screen } from "@testing-library/react";
import HomePage from "../components/HomePage";

test("renders hero section with call to action", () => {
  render(<HomePage />);
  const callToAction = screen.getByText(/empower girls/i);
  expect(callToAction).toBeInTheDocument();
});
