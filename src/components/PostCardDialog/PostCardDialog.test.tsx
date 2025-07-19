import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCardDialog from "./PostCardDialog";
import { useState } from "react";
import { posts } from "@/lib/posts";
import { vi } from "vitest";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const Wrapper = () => {
  const [postArray, setPostArray] = useState(posts);
  const handleClick = (postId: number, fileKey: string | null) => {};

  return (
    <PostCardDialog
      title=""
      imageUrl=""
      pickupCountry=""
      deliveryCity=""
      postId={1}
      handleClick={handleClick}
      setPostArray={setPostArray}
    />
  );
};

describe("<PostCardDialog>", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    render(<Wrapper />);
  });

  it("should display a delete button", async () => {
    render(<Wrapper />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should close after the delete button is clicked", async () => {
    render(<Wrapper />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    const deleteButton = screen.getByText("Delete");

    await userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should disable the 'Claimed' button when on the claimed tab", async () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      "/dashboard/claimed"
    );
    render(<Wrapper />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    const claimButton = screen.getByText("Claim *");

    expect(claimButton).toHaveAttribute("aria-disabled", "true");
  });
});
