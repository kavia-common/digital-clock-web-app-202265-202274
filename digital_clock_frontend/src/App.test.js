import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the current time label", () => {
  render(<App />);
  expect(screen.getByText(/current time/i)).toBeInTheDocument();
});
