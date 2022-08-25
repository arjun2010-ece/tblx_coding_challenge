import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing page", () => {
  render(<App />);
  const element = screen.getByText(/eCharger app is running!/i);
  expect(element).toBeInTheDocument();
});
