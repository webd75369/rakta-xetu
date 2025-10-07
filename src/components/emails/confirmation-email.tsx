import { Markdown, Html } from "@react-email/components";

interface Props {
  markdownContent: string;
}

export function ConfirmationEmail({ markdownContent }: Props) {
  return (
    <Html>
      <Markdown children={markdownContent} />
    </Html>
  );
}
