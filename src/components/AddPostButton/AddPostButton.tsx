import { DialogDescription } from "@radix-ui/react-dialog";
import PostForm from "../PostForm/PostForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { SetStateAction, useState } from "react";
import { Post } from "@/interfaces/Post";

interface AddPostButtonProps {
  itemName: string;
  pickupCountry: string;
  deliveryCity: string;
  imageUrl: string;
  setPostArray: React.Dispatch<SetStateAction<Post[]>>;
}

export default function AddPostButton({
  itemName,
  pickupCountry,
  deliveryCity,
  imageUrl,
  setPostArray,
}: AddPostButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-blue-700 hover:bg-blue-600 hover:text-gray-50`}>
          <CirclePlus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an Item Request</DialogTitle>
          <DialogDescription>
            Fill out the form below to create an item request
          </DialogDescription>
        </DialogHeader>
        <PostForm
          itemName={itemName}
          pickupCountry={pickupCountry}
          deliveryCity={deliveryCity}
          imageUrl={imageUrl}
          setOpen={setOpen}
          setPostArray={setPostArray}
        />
      </DialogContent>
    </Dialog>
  );
}
