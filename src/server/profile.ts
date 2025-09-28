"use server";
import connectToDb from "@/db";
import { Blood } from "@/db/models/blood";
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

export const chartInfo = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("the user is not authenticated");
    }
    await connectToDb();
    const totalUnitsDonated = await Blood.find({
      isAccepted: true,
      acceptedBy: session.user.id,
    });
    const totalUnitsRequested = await Blood.find({
      isAccepted: false,
      userId: session.user.id,
    });
    const totalLivesAffected = await Blood.find({ userId: session.user.id });
    return {
      totalUnitsDonated: totalUnitsDonated.reduce((acc, curr) => acc + curr, 0),
      totalUnitsRequested: totalUnitsRequested.reduce(
        (acc, curr) => acc + curr,
        0
      ),
      totalLivesAffected: totalLivesAffected.reduce(
        (acc, curr) => acc + curr,
        0
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      message: "failed to get chart info",
    };
  }
};
