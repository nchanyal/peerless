import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPostButton from "../AddPostButton/AddPostButton";
import { vi } from "vitest";
import { useState } from "react";
import { posts } from "@/lib/posts";

vi.mock("@/actions/post.actions", () => ({
  deletePost: vi.fn(),
  createPost: vi.fn().mockImplementation(() => ({
    id: 6,
    authorId: 6,
    claimerId: null,
    itemName: "Bread",
    imageUrl: "https://example.com/f/example.png",
    pickupCountry: "Ethiopia",
    deliveryCity: "Washington, DC",
  })),
}));

const Wrapper = () => {
  const [postArray, setPostArray] = useState(posts);

  return (
    <AddPostButton
      itemName="Coffee Beans"
      pickupCountry="Ethiopia"
      deliveryCity="Washington, DC"
      imageUrl="https://example.com/example.png"
      setPostArray={setPostArray}
    />
  );
};

describe("<PostForm />", () => {
  it("should close the dialog when the form is submitted", async () => {
    render(<Wrapper />);

    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    const formTitle = screen.getByText("Add an Item Request");

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.click(submitButton);

    expect(formTitle).not.toBeInTheDocument();
  });
});
