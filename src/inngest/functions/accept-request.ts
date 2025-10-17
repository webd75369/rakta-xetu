import { inngest } from "../client";
import { AcceptRequest } from "@/components/emails/accept-request";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const acceptRequest = inngest.createFunction(
  { id: "send-request" },
  { event: "send/request" },
  async ({ event }) => {
    const { data } = await resend.emails.send({
      from: `RaktaXetu <${process.env.SMTP_DOMAIN!}>`,
      to: [event.data.donor],
      subject: "Someone's ready to help — your blood request is accepted",
      react: AcceptRequest({
        donor: event.data.donor,
        email: event.data.email,
        image: event.data.image,
      }),
    });
    return data;
  }
);
