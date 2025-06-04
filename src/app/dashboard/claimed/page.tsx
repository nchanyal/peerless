import Dashboard from "@/components/Dashboard/Dashboard";
import { posts } from "@/lib/posts";

import { syncUser } from "@/actions/user.actions";
import { getAllPostsClaimed } from "@/actions/post.actions";

export default async function ClaimedPage() {
  /* await syncUser(); */ // uncomment when I do the final check
  /* const postsClaimed = await getAllPostsClaimed(); */

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
