import Dashboard from "@/components/Dashboard/Dashboard";
import { posts } from "@/lib/posts";

export default function ClaimedPage() {
  return (
    <Dashboard
      posts={posts}
      itemName=""
      pickupCountry=""
      deliveryCity=""
      imageUrl=""
    />
  );
}
