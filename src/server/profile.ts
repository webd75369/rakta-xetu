"use server";
import connectToDb from "@/db";
import Profile from "@/db/models/profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getProfileInfo = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("the user is not authenticated");
    }
    await connectToDb();
    const profile = await Profile.findOne({ userId: session?.user.id });
    return {
      name: profile.name,
      email: session.user.email,
      bloodGroup: profile.bloodGroup,
      isDonor: session.user.isDonor,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "failed to get name",
    };
  }
};
