import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "./Dashboard";
import { posts } from "@/lib/posts";
import { vi } from "vitest";

vi.mock("@/actions/post.actions", () => ({
  deletePost: vi.fn(),
  createPost: vi
    .fn()
    .mockImplementation(
      (
        itemName: string,
        imageUrl: string,
        pickupCountry: string,
        deliveryCity: string
      ) => ({
        id: 6,
        authorId: 6,
        claimerId: null,
        itemName: "Bread",
        imageUrl: "https://example.com/f/example.png",
        pickupCountry: "Ethiopia",
        deliveryCity: "Washington, DC",
      })
    ),
}));

vi.mock("@/server/uploadthing", () => ({
  utapi: {
    deleteFiles: vi.fn(),
  },
}));

vi.mock("@clerk/nextjs", () => ({
  SignOutButton: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe("<Dashboard />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("adds a new post when the form is submitted correctly", async () => {
    render(
      <Dashboard
        posts={posts}
        itemName="Bread"
        pickupCountry="Ethiopia"
        deliveryCity="Washington, DC"
        imageUrl="https://example.com/f/example.png"
      />
    );

    const addPostButton = screen.getByText("Add");

    await userEvent.click(addPostButton);

    const submitButton = screen.getByText("Submit");

    await userEvent.click(submitButton);

    expect(screen.getByText("Bread")).toBeInTheDocument();
  });
});
