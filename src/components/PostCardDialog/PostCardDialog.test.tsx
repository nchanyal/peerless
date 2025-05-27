import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCardDialog from "./PostCardDialog";

describe("<PostCardDialog>", () => {
  it("should render", () => {
    render(
      <PostCardDialog title="" imageUrl="" pickupCountry="" deliveryCity="" />
    );
  });
});
