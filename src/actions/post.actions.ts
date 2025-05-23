"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./user.actions";

export async function createPost(
  itemName: string,
  imageUrl: string,
  pickupCountry: string,
  deliveryCity: string
) {
  try {
    const user = await getUser();

    if (user === undefined) return;

    await prisma.post.create({
      data: {
        authorId: user.id,
        itemName: itemName,
        imageUrl: imageUrl,
        pickupCountry: pickupCountry,
        deliveryCity: deliveryCity,
      },
    });
  } catch (error) {
    console.log("Error in createPost", error);
  }
}
