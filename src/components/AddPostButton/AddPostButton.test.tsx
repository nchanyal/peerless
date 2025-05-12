import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import AddPostButton from "./AddPostButton";

describe("<AddPostButton />", () => {
  it("should render", () => {
    render(<AddPostButton />);
  });

  it("should open a form to add a post when clicked", async () => {
    render(<AddPostButton />);

    const addButton = screen.getByText("Add");

    await user.click(addButton);

    const formTitle = screen.getByText("Add an Item Request");

    expect(formTitle).toBeInTheDocument();
  });
});
