"use server";

import connectToDb from "@/db";
import { Blood } from "@/db/models/blood";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const fetchRequests = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("failed to fetch requests");
    await connectToDb();
    const result = await Blood.find({ $ne: { userId: session.user.id } }).sort({
      createdAt: -1,
    });
    const requests = JSON.parse(JSON.stringify(result));
    return requests;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to fetch requests",
    };
  }
};
