"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { IDonor } from "../../../types/schema";
import { Resend } from "resend";
import { SendRequest } from "@/components/emails/send-request";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendRequest = async (donor: IDonor) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("the user is not authenticated");
    const { data, error } = await resend.emails.send({
      from: `RaktaXetu <${process.env.SMTP_DOMAIN!}>`,
      to: [donor.user.email],
      subject: "Blood Donation Request",
      react: SendRequest({ donor }),
    });
    if(error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to send request",
    };
  }
};
