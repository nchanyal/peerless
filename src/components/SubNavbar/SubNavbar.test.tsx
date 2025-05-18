import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubNavbar from "./SubNavbar";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("<SubNavBar />", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup(); // clear out DOM between renders
  });

  it("should exist", () => {
    render(<SubNavbar />);
  });

  it("should render a pair of buttons on the left", () => {
    render(<SubNavbar />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    expect(availableButton).toBeInTheDocument();
    expect(claimedButton).toBeInTheDocument();
  });

  it("should show the 'Available' button as selected initially", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/available");
    render(<SubNavbar />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    expect(availableButton).toHaveAttribute("aria-selected", "true");
    expect(claimedButton).toHaveAttribute("aria-selected", "false");
  });

  it("should update the selection when the 'Claimed' button is clicked", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/available");
    const { rerender } = render(<SubNavbar />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    // Simulate user clicking "Claimed" (this would cause a router push)
    await userEvent.click(claimedButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/claimed");

    // Simulate route change to /dashboard/claimed
    (usePathname as jest.Mock).mockReturnValue("/dashboard/claimed");
    rerender(<SubNavbar />);

    expect(claimedButton).toHaveAttribute("aria-selected", "true");
    expect(availableButton).toHaveAttribute("aria-selected", "false");
  });

  it("should update the selection when the 'Available' button after clicking 'Claimed'", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/available");
    const { rerender } = render(<SubNavbar />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    await userEvent.click(claimedButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/claimed");

    // Simulate route change to /dashboard/claimed
    (usePathname as jest.Mock).mockReturnValue("/dashboard/claimed");
    rerender(<SubNavbar />);

    await userEvent.click(availableButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/available");

    // Simulate route change to /dashboard/claimed
    (usePathname as jest.Mock).mockReturnValue("/dashboard/available");
    rerender(<SubNavbar />);

    expect(availableButton).toHaveAttribute("aria-selected", "true");
    expect(claimedButton).toHaveAttribute("aria-selected", "false");
  });

  it("should not redirect if the 'Available' button is clicked multiple times once selected", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/available");
    render(<SubNavbar />);

    const availableButton = screen.getByText("Available");

    await userEvent.click(availableButton);
    await userEvent.click(availableButton);

    expect(pushMock).not.toHaveBeenCalledWith("/dashboard/available");
  });

  it("should not redirect if the 'Claimed' button is clicked multiple times once selected", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/claimed");
    render(<SubNavbar />);

    const claimedButton = screen.getByText("Claimed");

    await userEvent.click(claimedButton);
    await userEvent.click(claimedButton);

    expect(pushMock).not.toHaveBeenCalledWith("/dashboard/claimed");
  });
});
