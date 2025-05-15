import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "./PostForm";

describe("<PostForm />", () => {
  it("should render", () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );
  });

  it("shows a validation error when the item name is too short", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const itemNameInput = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(itemNameInput, "Co");
    await userEvent.click(submitButton);

    const formMessage = screen.getByText(
      "Item name must be at least 3 characters!"
    );

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the item name is too long", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const itemNameInput = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(
      itemNameInput,
      "Lorem ipsum dolor sit amet, consectetur..."
    );
    await userEvent.click(submitButton);

    const formMessage = screen.getByText("Item name is too long!");

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the pickup country is too short", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const pickupCountryInput = screen.getByLabelText("Pickup Country");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(pickupCountryInput, "US");
    await userEvent.click(submitButton);

    const formMessage = screen.getByText(
      "Pickup country must have at least 3 characters!"
    );

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the pickup country is too long", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const pickupCountryInput = screen.getByLabelText("Pickup Country");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(
      pickupCountryInput,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    await userEvent.click(submitButton);

    const formMessage = screen.getByText("Pickup country is too long!");

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the delivery city is too short", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const deliveryCityInput = screen.getByLabelText("Delivery City");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(deliveryCityInput, "Ut");
    await userEvent.click(submitButton);

    const formMessage = screen.getByText(
      "Delivery city must have at least 3 characters!"
    );

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the delivery city is too long", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const deliveryCityInput = screen.getByLabelText("Delivery City");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(
      deliveryCityInput,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    await userEvent.click(submitButton);

    const formMessage = screen.getByText("Delivery city is too long!");

    expect(formMessage).toBeInTheDocument();
  });

  it("shows a validation error when the image url does not exist", async () => {
    render(
      <PostForm itemName="" pickupCountry="" deliveryCity="" imageUrl="" />
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.click(submitButton);

    const formMessage = screen.getByText(
      "You must upload an image for the item!"
    );

    expect(formMessage).toBeInTheDocument();
  });
});
