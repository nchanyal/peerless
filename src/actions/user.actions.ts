"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    // Quit the function if the user isn't signed in
    if (!userId) return;

    // Quit the function if the firstName, lastName, or primaryEmailAddress fields don't exist
    if (
      !clerkUser?.firstName ||
      !clerkUser?.lastName ||
      !clerkUser?.primaryEmailAddress
    )
      return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    // Create a new user in the database if the current user doesn't exist there
    if (!existingUser) {
      await prisma.user.create({
        data: {
          clerkId: userId,
          firstName: clerkUser?.firstName,
          lastName: clerkUser?.lastName,
          email: clerkUser?.primaryEmailAddress?.emailAddress,
        },
      });
    }
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUser() {
  try {
    const { userId } = await auth();

    // Quit the function if the user isn't signed in
    if (!userId) return;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    // Quit the function if the user doesn't exist in the database
    if (!user) return;

    return user;
  } catch (error) {
    console.log("Error in getUser", error);
  }
}
