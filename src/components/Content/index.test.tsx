import { render, screen } from "@testing-library/react";
import Content from "./index";

describe("renders Tables component", () => {
  beforeEach(() => {
    render(<Content />);
  });

  test("should render the charging stations title ", () => {
    const element = screen.getByText("Socket type");
    expect(element).toBeInTheDocument();
  });

   test("should render the filter content normal ", () => {
     const element = screen.getByText("Normal");
     expect(element).toBeInTheDocument();
   });

    test("should render the filter content Rapido ", () => {
      const element = screen.getByText("Rapido");
      expect(element).toBeInTheDocument();
    });
});
