import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostCard from "../PostCard/PostCard";
import { PostCardProps } from "@/interfaces/PostCardProps";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PostCardDialog({
  title,
  imageUrl,
  pickupCountry,
  deliveryCity,
}: PostCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PostCard
          title={title}
          imageUrl={imageUrl}
          pickupCountry={pickupCountry}
          deliveryCity={deliveryCity}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="pb-3">
          <p className="pb-4">Pickup Country: {pickupCountry}</p>
          <p>Delivery City: {deliveryCity}</p>
        </div>
        {/* Image placeholder */}
        <div className="flex justify-center">
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
        <Button
          type="submit"
          className={`bg-blue-700 hover:bg-blue-600 hover:text-gray-50 disabled:bg-blue-500 w-19`}
        >
          Claim
        </Button>
      </DialogContent>
    </Dialog>
  );
}
