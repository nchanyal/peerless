import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubNavbar from "./SubNavbar";
import { useRouter, usePathname } from "next/navigation";
import { vi } from "vitest";
import { posts } from "@/lib/posts";
import { SetStateAction, useState } from "react";
import { Post } from "@/interfaces/Post";

// Replace Jest mocks with Vitest mocks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

const Wrapper = () => {
  const [postArray, setPostArray] = useState(posts);

  return (
    <SubNavbar
      itemName=""
      pickupCountry=""
      deliveryCity=""
      imageUrl=""
      setPostArray={setPostArray}
    />
  );
};

describe("<SubNavBar />", () => {
  let pushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    pushMock = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should exist", () => {
    render(<Wrapper />);
  });

  it("should render a pair of buttons on the left", () => {
    render(<Wrapper />);
    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    expect(availableButton).toBeInTheDocument();
    expect(claimedButton).toBeInTheDocument();
  });

  it("should show the 'Available' button as selected initially", () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/available"
    );
    render(<Wrapper />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    expect(availableButton).toHaveAttribute("aria-selected", "true");
    expect(claimedButton).toHaveAttribute("aria-selected", "false");
  });

  it("should update the selection when the 'Claimed' button is clicked", async () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/available"
    );
    const { rerender } = render(<Wrapper />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    await userEvent.click(claimedButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/claimed");

    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/claimed"
    );
    rerender(<Wrapper />);

    expect(claimedButton).toHaveAttribute("aria-selected", "true");
    expect(availableButton).toHaveAttribute("aria-selected", "false");
  });

  it("should update the selection when the 'Available' button after clicking 'Claimed'", async () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/available"
    );
    const { rerender } = render(<Wrapper />);

    const availableButton = screen.getByText("Available");
    const claimedButton = screen.getByText("Claimed");

    await userEvent.click(claimedButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/claimed");

    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/claimed"
    );
    rerender(<Wrapper />);

    await userEvent.click(availableButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard/available");

    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/available"
    );
    rerender(<Wrapper />);

    expect(availableButton).toHaveAttribute("aria-selected", "true");
    expect(claimedButton).toHaveAttribute("aria-selected", "false");
  });

  it("should not redirect if the 'Available' button is clicked multiple times once selected", async () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/available"
    );
    render(<Wrapper />);

    const availableButton = screen.getByText("Available");

    await userEvent.click(availableButton);
    await userEvent.click(availableButton);

    expect(pushMock).not.toHaveBeenCalledWith("/dashboard/available");
  });

  it("should not redirect if the 'Claimed' button is clicked multiple times once selected", async () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/claimed"
    );
    render(<Wrapper />);

    const claimedButton = screen.getByText("Claimed");

    await userEvent.click(claimedButton);
    await userEvent.click(claimedButton);

    expect(pushMock).not.toHaveBeenCalledWith("/dashboard/claimed");
  });
});
