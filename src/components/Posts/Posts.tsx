import PostCardDialog from "../PostCardDialog/PostCardDialog";

interface PostsProps {
  posts: Post[] | undefined;
}

interface Post {
  id: number;
  authorId: number;
  claimerId: number | null;
  itemName: string;
  imageUrl: string;
  pickupCountry: string;
  deliveryCity: string;
}

export default function Posts({ posts = [] }: PostsProps) {
  return (
    <div className="my-8 grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {posts.map((post) => (
        <PostCardDialog
          key={post.id}
          title={post.itemName}
          imageUrl={post.imageUrl}
          pickupCountry={post.pickupCountry}
          deliveryCity={post.deliveryCity}
        />
      ))}
    </div>
  );
}
