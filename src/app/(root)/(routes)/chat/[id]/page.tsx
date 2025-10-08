import { ChatComponent } from "@/components/modules/chat/chat-window";
import { getToken } from "@/server/chat/generate-token";

export default async function ChatWindow({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const items = await getToken();
  return <ChatComponent items={items} />;
}
