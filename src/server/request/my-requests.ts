"use client";

import connectToDb from "@/db";
import { Blood } from "@/db/models/blood";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const myRequests = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("the user is not authenticated");
    await connectToDb();
    const results = await Blood.find({ userId: session.user.id });
    const myRequests = JSON.parse(JSON.stringify(results));
    return myRequests;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to fetch the requests",
    };
  }
};
