"use server";
import { inngest } from "@/inngest/client";

export const sendEmail = async (
  hospitalName: string,
  startTime: string,
  calendarLink: string | null | undefined
) => {
  try {
    await inngest.send({
      name: "confirmation/email",
      data: {
        hospitalName,
        startTime,
        calendarLink,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "failed to trigger event",
    };
  }
};
