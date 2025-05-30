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
import { useState } from "react";

interface PostCardDialogProps {
  postId: number;
  title: string;
  imageUrl: string;
  pickupCountry: string;
  deliveryCity: string;
  handleClick: (postId: number, fileKey: string | null) => void;
}

export default function PostCardDialog({
  postId,
  title,
  imageUrl,
  pickupCountry,
  deliveryCity,
  handleClick,
}: PostCardDialogProps) {
  // State variables for opening and closing the dialog
  const [open, setOpen] = useState(false);

  const fileKey = extractFileKey(imageUrl);

  const handleDeleteClick = () => {
    handleClick(postId, fileKey);
    setOpen(false);
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
          >
            Claim
          </Button>
          <Button
            type="button"
            className={`bg-red-700 hover:bg-red-600 hover:text-gray-50 w-19`}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
