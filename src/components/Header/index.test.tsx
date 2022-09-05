import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("renders Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("display header title", () => {
    const element = screen.getByText(/eCharger/i);
    expect(element).toBeInTheDocument();
  });

  test("display logged in user name", () => {
    const element = screen.getByText(/Bart vader/i);
    expect(element).toBeInTheDocument();
  });
});
