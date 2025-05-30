import { cleanup, render, screen } from "@testing-library/react";
import Posts from "./Posts";
import { posts } from "@/lib/posts";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/server/uploadthing", () => ({
  utapi: {
    deleteFiles: vi.fn(),
  },
}));

vi.mock("@/actions/post.actions", () => ({
  deletePost: vi.fn(),
}));

describe("<Posts />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should render", () => {
    render(<Posts posts={[]} />);
  });

  it("should display a list of posts", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getByText("Beans")).toBeInTheDocument();
    expect(screen.getByText("Chips")).toBeInTheDocument();
  });

  it("should remove the post after the delete button is clicked", async () => {
    render(<Posts posts={posts} />);

    const postCard = screen.getByTestId("post-id-1");

    await userEvent.click(postCard);

    const deleteButton = screen.getByText("Delete");

    await userEvent.click(deleteButton);

    expect(postCard).not.toBeInTheDocument();
  });
});
