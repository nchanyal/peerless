import { render, screen } from "@testing-library/react";
import Posts from "./Posts";
import { posts } from "@/lib/posts";

describe("<Posts />", () => {
  it("should render", () => {
    render(<Posts posts={[]} />);
  });

  it("should display a list of posts", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Beans")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
  });
});
