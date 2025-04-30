import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("<Navbar />", () => {
  it("should render", () => {
    render(<Navbar />);

    const elem = screen.getByText("Peerless");

    expect(elem).toBeInTheDocument();
  });
});
