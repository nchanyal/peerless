import { syncUser } from "@/actions/user.actions";
import Navbar from "../Navbar/Navbar";
import SubNavbar from "../SubNavbar/SubNavbar";
import { getAllUnclaimedPosts } from "@/actions/post.actions";
import Posts from "../Posts/Posts";

export default async function Dashboard() {
  /* await syncUser() */ // uncomment when I do the final check
  const posts = await getAllUnclaimedPosts();

  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="bg-gray-100 flex-1">
        <div className="w-full max-w-[1400px] mx-auto px-8">
          <SubNavbar />
          <Posts posts={posts} />
        </div>
      </main>
    </div>
  );
}
