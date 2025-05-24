import { render, screen } from "@testing-library/react";
import Posts from "./Posts";

describe("<Posts />", () => {
  it("should render", () => {
    render(<Posts posts={[]} />);
  });

  it("should display a list of posts", () => {
    const posts = [
      {
        id: 1,
        authorId: 1,
        claimerId: null,
        itemName: "Coffee",
        imageUrl: "www.hello.com",
        pickupCountry: "Ethiopia",
        deliveryCity: "Washington, DC",
      },
      {
        id: 2,
        authorId: 2,
        claimerId: null,
        itemName: "Beans",
        imageUrl: "www.hello.com",
        pickupCountry: "Ethiopia",
        deliveryCity: "Washington, DC",
      },
      {
        id: 3,
        authorId: 3,
        claimerId: null,
        itemName: "Chips",
        imageUrl: "www.hello.com",
        pickupCountry: "Ethiopia",
        deliveryCity: "Washington, DC",
      },
    ];
    render(<Posts posts={posts} />);

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Beans")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
  });
});
