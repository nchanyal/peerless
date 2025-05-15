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
import { PostFormProps } from "@/interfaces/PostFormProps";

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
}: PostFormProps) {
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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (setOpen !== undefined) {
      // Close the dialog
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
