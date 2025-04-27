import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("<Home />", () => {
  it("should render", () => {
    render(<Home />);

    const elem = screen.getByText("joe");

    expect(elem).toBeInTheDocument();
  });
});
