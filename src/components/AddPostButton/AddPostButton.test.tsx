import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPostButton from "../AddPostButton/AddPostButton";

describe("<PostForm />", () => {
  it("should close the dialog when the form is submitted", async () => {
    render(
      <AddPostButton
        itemName="Coffee Beans"
        pickupCountry="Ethiopia"
        deliveryCity="Washington, DC"
        imageUrl="https://example.com/example.png"
      />
    );

    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    const formTitle = screen.getByText("Add an Item Request");

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.click(submitButton);

    expect(formTitle).not.toBeInTheDocument();
  });
});
