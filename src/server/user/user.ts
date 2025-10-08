"use server";
import { auth, db } from "@/lib/auth";
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

export const listUsers = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("user is not authenticated");
    await connectToDb();
    const result = await db.collection("user").find().toArray();
    const users = JSON.parse(JSON.stringify(result));
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to list users",
    };
  }
};
