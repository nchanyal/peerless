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

    const post = await prisma.post.create({
      data: {
        authorId: user.id,
        itemName: itemName,
        imageUrl: imageUrl,
        pickupCountry: pickupCountry,
        deliveryCity: deliveryCity,
      },
    });

    return post;
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

export async function deletePost(postId: number) {
  try {
    const { userId } = await auth();

    if (!userId) return;

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.log("Error in deletePost", error);
  }
}

/**
 * Updates the claimerId attribute for the post in the
 * database whose id equals postId. This makes it easier
 * to mark a post as "claimed"
 * @param postId the post id
 */
export async function updateClaimerId(postId: number) {
  try {
    const user = await getUser();

    if (!user) return;

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        claimerId: user.id,
      },
    });

    return post;
  } catch (error) {
    console.log("Error in updateClaimerId", error);
  }
}

/**
 * Returns all the posts claimed by the current user.
 */
export async function getAllPostsClaimed() {
  try {
    const user = await getUser();

    if (!user) return;

    const posts = await prisma.post.findMany({
      where: {
        claimerId: user.id,
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getAllClaimedPosts", error);
  }
}

/**
 * Returns all the posts created by the user and
 * claimed by others.
 */
export async function getAllClaimedPosts() {
  try {
    const user = await getUser();

    if (!user) return;

    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
        claimerId: {
          not: null,
        },
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getAllClaimedPosts", error);
  }
}
