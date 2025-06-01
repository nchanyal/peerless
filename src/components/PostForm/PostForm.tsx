"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UploadButton } from "@/utils/uploadthing";
import { createPost } from "@/actions/post.actions";
import { twMerge } from "tailwind-merge";
import { SetStateAction, useState } from "react";
import { Post } from "@/interfaces/Post";

interface PostFormProps {
  itemName: string;
  pickupCountry: string;
  deliveryCity: string;
  imageUrl: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostArray: React.Dispatch<SetStateAction<Post[]>>;
}

const formSchema = z.object({
  itemName: z
    .string()
    .min(3, "Item name must be at least 3 characters!")
    .max(30, "Item name is too long!"),
  pickupCountry: z
    .string()
    .min(3, "Pickup country must have at least 3 characters!")
    .max(80, "Pickup country is too long!"),
  deliveryCity: z
    .string()
    .min(3, "Delivery city must have at least 3 characters!")
    .max(80, "Delivery city is too long!"),
  imageUrl: z.string().url("You must upload an image for the item!"),
});

export default function PostForm({
  itemName,
  pickupCountry,
  deliveryCity,
  imageUrl,
  setOpen,
  setPostArray,
}: PostFormProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  // Define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: itemName,
      pickupCountry: pickupCountry,
      deliveryCity: deliveryCity,
      imageUrl: imageUrl,
    },
  });

  // Define the function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (setOpen !== undefined) {
      try {
        setIsDisabled(true);

        // Create a new post based on what the user filled in the fields
        const post = await createPost(
          values.itemName,
          values.imageUrl,
          values.pickupCountry,
          values.deliveryCity
        );

        // Quit the function if the post is undefined
        if (!post) return;

        // Close the dialog
        setOpen(false);

        // Add the post to the dashboard
        setPostArray((posts) => [...posts, post]);
      } catch (error) {
        console.log("Error in form submission", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="mt-4 mb-6">
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pickupCountry"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Pickup Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryCity"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Delivery City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(response) => {
                    if (response && response[0]?.ufsUrl) {
                      form.setValue("imageUrl", response[0]?.ufsUrl);
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Upload failed:", error);
                  }}
                  disabled={form.getValues("imageUrl") !== ""}
                  className="ut-button:ut-readying:bg-slate-500 ut-button:ut-ready:bg-slate-500 ut-button:ut-uploading:bg-slate-400 ut-button:data-[state=disabled]:bg-slate-400"
                  config={{ cn: twMerge }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`bg-blue-700 hover:bg-blue-600 hover:text-gray-50 disabled:bg-blue-500`}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
