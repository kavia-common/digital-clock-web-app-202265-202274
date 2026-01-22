import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Digital Clock heading", () => {
  render(<App />);
  expect(screen.getByText(/Digital Clock/i)).toBeInTheDocument();
});
