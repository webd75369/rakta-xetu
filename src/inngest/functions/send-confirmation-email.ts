import { ConfirmationEmail } from "@/components/emails/confirmation-email";
import { xai } from "@ai-sdk/xai";
import { inngest } from "../client";
import { Resend } from "resend";
import { generateText } from "ai";
import connectToDb from "@/db";
import Schedule from "@/db/models/schedule";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendConfirmationEmail = inngest.createFunction(
  { id: "confirmation" },
  { event: "confirmation/email" },
  async ({ event }) => {
    const donationDateUTC = event.data.startTime;
    const timeZone = "Asia/Kolkata";
    const donationDateIST = toZonedTime(donationDateUTC, timeZone);
    const formattedDate = format(donationDateIST, "d MMMM yyyy, h:mm a");
    const { text: markdownContent } = await generateText({
      model: xai("grok-3-mini"),
      prompt: `Generate a warm, professional, and concise confirmation email for a blood donation appointment       using the details below. Follow all instructions carefully.

               Input Variables:

               hospitalName: ${event.data.hospitalName}

               donationDateTime: ${formattedDate}

               googleCalendarLink: ${event.data.calendarLink}

               Requirements:

               1. Begin with a friendly greeting addressing the donor.

               2. Clearly confirm the appointment details (hospital name, date, and time).

               3. Include a short paragraph expressing gratitude for their life-saving contribution.

               4. Provide three practical health tips to prepare for the donation (e.g., hydration, rest, diet).

               5. Close with an encouraging and professional message.

               6. Keep the email concise, well-structured, and easily readable (max 200 words).

               7. Include a clear “You can view and manage your scheduled donation in your calendar using the following link:” section linking to the googleCalendarLink.

               8. Sign off as “RaktaXetu Team”.

               9. Do not include any information not provided in the input.

               Output Format:

               Well-formatted email suitable for sending directly to the donor.
               `,
    });

    const { data } = await resend.emails.send({
      from: `RaktaXetu <${process.env.SMTP_DOMAIN!}>`,
      to: [event.data.email],
      subject: "Blood Donation Confirmation & Health Tips",
      react: ConfirmationEmail({ markdownContent }),
    });
    if (data?.id) {
      await connectToDb();
      await Schedule.findOneAndUpdate(
        { userId: event.data.userId, googleEventId: event.data.googleEventId },
        { $set: { confirmationEmailSent: true } },
        { new: true }
      );
    }
    return { data, time: event.data.startTime };
  }
);
