"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostCard from "../PostCard/PostCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { extractFileKey } from "@/lib/extractFileKey";
import { SetStateAction, useState } from "react";
import { updateClaimerId } from "@/actions/post.actions";
import { Post } from "@/interfaces/Post";
import { usePathname } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PostCardDialogProps {
  postId: number;
  title: string;
  imageUrl: string;
  pickupCountry: string;
  deliveryCity: string;
  handleClick: (postId: number, fileKey: string | null) => void;
  setPostArray: React.Dispatch<SetStateAction<Post[]>>;
}

export default function PostCardDialog({
  postId,
  title,
  imageUrl,
  pickupCountry,
  deliveryCity,
  handleClick,
  setPostArray,
}: PostCardDialogProps) {
  // State variables for opening and closing the dialog
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const fileKey = extractFileKey(imageUrl);

  const handleDeleteClick = () => {
    handleClick(postId, fileKey);
    setOpen(false);
  };

  const handleClaimClick = async () => {
    try {
      const post = await updateClaimerId(postId);

      // Quit the function if the post is undefined
      if (!post) {
        console.log("Post failed to update");
        return;
      }

      // Delete the post whose id was passed as a prop from Dashboard
      setPostArray((posts) => posts.filter((post) => post.id !== postId));

      setOpen(false);
    } catch (error) {
      console.log("Error in handleClaimClick", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <button data-testid={`post-id-${postId}`}>
          <PostCard
            title={title}
            pickupCountry={pickupCountry}
            deliveryCity={deliveryCity}
          />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{`Item request for ${title}`}</DialogDescription>
        </DialogHeader>
        <div className="pb-3">
          <p className="pb-4">Pickup Country: {pickupCountry}</p>
          <p>Delivery City: {deliveryCity}</p>
        </div>
        {/* Image or a placeholder */}
        <div className="flex justify-center my-4">
          <div className="relative h-[300px] w-full max-w-full overflow-hidden rounded-lg bg-white">
            {imageUrl !== "" ? (
              <Image
                src={imageUrl}
                alt="Remote image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            ) : (
              "Image Placeholder"
            )}
          </div>
        </div>
        <div className="flex gap-6">
          <Button
            type="button"
            className={`bg-blue-700 hover:bg-blue-600 hover:text-gray-50 disabled:bg-blue-500 w-19`}
            onClick={handleClaimClick}
            disabled={pathname === "/dashboard/claimed" ? true : false}
            aria-disabled={pathname === "/dashboard/claimed" ? true : false}
          >
            Claim *
          </Button>
          <Button
            type="button"
            className={`bg-red-700 hover:bg-red-600 hover:text-gray-50 w-19`}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
        <div>
          <p className="text-sm">
            * Note: You can&apos;t claim your own item request
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
