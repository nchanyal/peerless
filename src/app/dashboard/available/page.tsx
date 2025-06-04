import Dashboard from "@/components/Dashboard/Dashboard";
import { posts } from "@/lib/posts";

import { syncUser } from "@/actions/user.actions";
import { getAllUnclaimedPosts } from "@/actions/post.actions";

export default async function AvailablePage() {
  /* await syncUser(); */ // uncomment when I do the final check
  /* const posts = await getAllUnclaimedPosts(); */ // uncomment when I do the final check

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
