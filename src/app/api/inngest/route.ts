import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { healthCheck } from "@/inngest/functions/health";
import { sendEmail } from "@/inngest/functions/send-email";
import { sendConfirmationEmail } from "@/inngest/functions/send-confirmation-email";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [healthCheck, sendEmail, sendConfirmationEmail],
});
