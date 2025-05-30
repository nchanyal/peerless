"use client";

import { deleteFile } from "@/actions/image";
import PostCardDialog from "../PostCardDialog/PostCardDialog";
import { deletePost } from "@/actions/post.actions";
import { useState } from "react";

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
  const [postArray, setPostArray] = useState(posts);

  const handleClick = async (postId: number, fileKey: string | null) => {
    try {
      await deletePost(postId);
      await deleteFile(fileKey);

      // Delete the post whose id was passed as a parameter from the dashboard
      setPostArray((prevState) =>
        prevState.filter((post) => post.id !== postId)
      );
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
