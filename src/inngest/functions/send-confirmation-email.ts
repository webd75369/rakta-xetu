import { ConfirmationEmail } from "@/components/emails/confirmation-email";
import { xai } from "@ai-sdk/xai";
import { inngest } from "../client";
import { Resend } from "resend";
import { generateText } from "ai";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendConfirmationEmail = inngest.createFunction(
  { id: "confirmation" },
  { event: "confirmation/email" },
  async ({ event }) => {
    const { text: markdownContent } = await generateText({
      model: xai("grok-3-mini"),
      prompt: `Generate a warm, professional confirmation email for a blood donation appointment.

               Details:
               - Hospital Name: ${event.data.hospitalName}
               - Donation Date & Time: ${new Date(event.data.startTime).toLocaleString()}
               - Google Calendar Link: ${event.data.googleCalendarLink}
                   
               Requirements:
               1. Start with a friendly greeting addressing the donor.
               2. Confirm their appointment details clearly (hospital name, date, time).
               3. Include a short paragraph thanking them for contributing to saving lives.
               4. Add 3 personalized health tips to prepare for a blood donation — such as hydration, rest, and diet.
               5. Close with an encouraging message and a professional tone.
               6. Keep it concise (max 200 words) and structured for email readability.
               7. Include a clear "Add to Calendar" section linking to the provided Google Calendar link.`,
    });
    const { data } = await resend.emails.send({
      from: `RaktaXetu <${process.env.SMTP_DOMAIN!}>`,
      to: [event.data.email],
      subject: "Blood Donation Confirmation & Health Tips",
      react: ConfirmationEmail({ markdownContent }),
    });
    return data;
  }
);
