"use server";
import { auth } from "@/lib/auth";
import { IProfile } from "../../../types/schema";
import { headers } from "next/headers";
import connectToDb from "@/db";
import Profile from "@/db/models/profile";

export const createUser = async (items: IProfile) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("user is not authenticated");
    }
    await connectToDb();
    const profile = await Profile.findOne({ userId: session.user.id });
    if (profile) throw new Error("profile already exists");
    const result = await Profile.create({ ...items, userId: session.user.id });
    return {
      profileId: result._id.toString(),
    };
  } catch (error) {
    console.error(error);
    return {
      message: "failed to create profile",
    };
  }
};
