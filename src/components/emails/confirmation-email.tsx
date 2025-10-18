import {
  Html,
  Tailwind,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Row,
  Column,
  Hr,
} from "@react-email/components";

interface Props {
  donorName?: string;
  hospitalName: string;
  donationDateTime: string;
  calendarLink?: string;
}

export function ConfirmationEmail({
  donorName,
  hospitalName,
  donationDateTime,
  calendarLink,
}: Props) {
  return (
    <Html>
      <Tailwind>
        <Container style={{ padding: "20px" }}>
          <Section>
            <Heading className="text-2xl font-semibold text-slate-800">
              Donation Confirmation
            </Heading>
            <Text className="text-sm text-slate-600 mt-2">
              Hi {donorName ?? "there"},
            </Text>

            <Text className="mt-4 text-slate-700">
              Thank you for scheduling a blood donation with us. This email
              confirms your appointment at{" "}
              <span className="font-medium">{hospitalName}</span> on{" "}
              <span className="font-medium">{donationDateTime}</span>.
            </Text>

            <Section className="mt-4 p-4 bg-slate-50 rounded-md">
              <Heading className="text-base font-semibold">
                Preparation Tips
              </Heading>
              <Row className="mt-2">
                <Column>
                  <Text className="text-sm">
                    • Stay well hydrated — drink plenty of fluids the day before
                    and the day of your donation.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-sm">
                    • Get a good night's rest before your appointment.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-sm">
                    • Eat a healthy meal and avoid fatty foods prior to
                    donating.
                  </Text>
                </Column>
              </Row>
            </Section>

            {calendarLink && (
              <Section className="mt-4">
                <Text className="text-sm text-slate-700">
                  You can view and manage your scheduled donation in your
                  calendar using the following link:
                </Text>
                <Button
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
                  href={calendarLink}
                >
                  View in calendar
                </Button>
              </Section>
            )}

            <Text className="mt-6 text-slate-700">
              We appreciate your life-saving contribution. If you need to
              reschedule or cancel, please use the calendar link or contact the
              hospital directly.
            </Text>

            <Text className="mt-4 font-medium">
              Warm regards,
              <br />
              RaktaXetu Team
            </Text>

            <Hr className="my-6" />
            <Text className="text-xs text-slate-500">
              If you did not schedule this appointment or believe this is an
              error, please contact support.
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
