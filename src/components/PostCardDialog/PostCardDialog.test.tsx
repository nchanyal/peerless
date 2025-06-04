import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCardDialog from "./PostCardDialog";
import { useState } from "react";
import { posts } from "@/lib/posts";

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
});
