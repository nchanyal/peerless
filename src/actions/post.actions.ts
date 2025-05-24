"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./user.actions";
import { auth } from "@clerk/nextjs/server";

export async function createPost(
  itemName: string,
  imageUrl: string,
  pickupCountry: string,
  deliveryCity: string
) {
  try {
    const user = await getUser();

    if (!user) return;

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

export async function getAllUnclaimedPosts() {
  try {
    const { userId } = await auth();

    if (!userId) return;

    const posts = await prisma.post.findMany({
      where: {
        claimerId: null,
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getAllUnclaimedPosts", error);
  }
}
