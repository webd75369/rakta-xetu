"use server";

import connectToDb from "@/db";
import Profile from "@/db/models/profile";
import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const acceptRequest = async (requestorEmail: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("the user is not authenticated");
    await connectToDb();
    const profile = await Profile.findOne({ userId: session.user.id });
    const { email, image } = session.user;
    await inngest.send({
      name: "accept/request",
      data: {
        donor: profile,
        email,
        image,
        requestorEmail,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "failed to accept request",
    };
  }
};
