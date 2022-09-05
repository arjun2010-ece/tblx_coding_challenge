import { render, screen } from "@testing-library/react";
import Tables from "./index";
import chargingStationsMock from "../../mocks/chargingStations.json";
 

describe("renders Tables component", () => {
  beforeEach(() => {
    render(<Tables chargingStations={chargingStationsMock} />);
  });

  test("should render the correct about of tablerows", () => {
    const element = screen.getAllByTestId(/tableRow/i);
    expect(element.length).toBe(5);
  });

 
});
