import { deleteImageFile } from "@/actions/image";
import PostCardDialog from "../PostCardDialog/PostCardDialog";
import { deletePost } from "@/actions/post.actions";
import { Post } from "@/interfaces/Post";
import { SetStateAction } from "react";

interface PostsProps {
  postArray: Post[];
  setPostArray: React.Dispatch<SetStateAction<Post[]>>;
}

export default function Posts({ postArray, setPostArray }: PostsProps) {
  const handleClick = async (postId: number, fileKey: string | null) => {
    try {
      await deletePost(postId);
      await deleteImageFile(fileKey);

      // Delete the post whose id was passed as a parameter from the dashboard
      setPostArray((posts) => posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error when deleting post", error);
    }
  };

  return (
    <div className="my-8 grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {postArray.map((post) => (
        <PostCardDialog
          key={post.id}
          postId={post.id}
          title={post.itemName}
          imageUrl={post.imageUrl}
          pickupCountry={post.pickupCountry}
          deliveryCity={post.deliveryCity}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
