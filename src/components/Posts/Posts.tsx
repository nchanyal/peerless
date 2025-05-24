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
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.itemName}</li>
        ))}
      </ul>
    </div>
  );
}
