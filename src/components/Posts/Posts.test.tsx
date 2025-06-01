import { cleanup, render, screen } from "@testing-library/react";
import Posts from "./Posts";
import { posts } from "@/lib/posts";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

vi.mock("@/server/uploadthing", () => ({
  utapi: {
    deleteFiles: vi.fn(),
  },
}));

vi.mock("@/actions/post.actions", () => ({
  deletePost: vi.fn(),
}));

const Wrapper = () => {
  const [postArray, setPostArray] = useState(posts);

  return <Posts postArray={postArray} setPostArray={setPostArray} />;
};

describe("<Posts />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should render", () => {
    render(<Wrapper />);
  });

  it("should display a list of posts", () => {
    render(<Wrapper />);

    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getByText("Beans")).toBeInTheDocument();
    expect(screen.getByText("Chips")).toBeInTheDocument();
  });

  it("should remove the post after the delete button is clicked", async () => {
    render(<Wrapper />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    const deleteButton = screen.getByText("Delete");

    await userEvent.click(deleteButton);

    expect(postCard).not.toBeInTheDocument();
  });

  it("should add the post after the form is submitted", async () => {
    render(<Wrapper />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    const deleteButton = screen.getByText("Delete");

    await userEvent.click(deleteButton);

    expect(postCard).not.toBeInTheDocument();
  });
});
