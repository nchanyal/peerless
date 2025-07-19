import Dashboard from "@/components/Dashboard/Dashboard";
import { syncUser } from "@/actions/user.actions";
import { getAllPostsClaimed } from "@/actions/post.actions";

export const dynamic = "force-dynamic";

export default async function ClaimedPage() {
  await syncUser();
  const postsClaimed = await getAllPostsClaimed();

  return (
    <Dashboard
      posts={postsClaimed ? postsClaimed : []}
      itemName=""
      pickupCountry=""
      deliveryCity=""
      imageUrl=""
    />
  );
}
