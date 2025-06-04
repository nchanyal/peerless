import Dashboard from "@/components/Dashboard/Dashboard";
import { syncUser } from "@/actions/user.actions";
import { getAllUnclaimedPosts } from "@/actions/post.actions";

export default async function AvailablePage() {
  await syncUser();
  const posts = await getAllUnclaimedPosts();

  return (
    <Dashboard
      posts={posts ? posts : []}
      itemName=""
      pickupCountry=""
      deliveryCity=""
      imageUrl=""
    />
  );
}
