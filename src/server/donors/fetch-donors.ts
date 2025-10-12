"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/auth";
import connectToDb from "@/db";
import { ObjectId } from "mongodb";

export const fetchDonors = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("the user is not authenticated");
    await connectToDb();
    const result = await db
      .collection("user")
      .find({ _id: { $ne: new ObjectId(session.user.id) }, isDonor: true })
      .sort({ createdAt: -1 })
      .toArray();
    const donors = JSON.parse(JSON.stringify(result));
    return donors;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to fetch donors",
    };
  }
};
