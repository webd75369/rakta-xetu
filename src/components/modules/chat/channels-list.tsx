"use client";

import { Spinner } from "@/components/spinner";
import { type User } from "stream-chat";
import { Chat, ChannelList, useCreateChatClient } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

interface Props {
  user: User;
  token: string;
}

export function ChannelsList({ user, token }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const userId = user.id.toString();
  const userToken = token;

  const filters = { members: { $in: [userId] }, type: "messaging" };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 } as any;

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: { id: userId },
  });

  if (!client) {
    return (
      <div className="max-w-md mx-auto w-full flex justify-center items-center my-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <Chat client={client}>
        <ChannelList filters={filters} options={options} sort={sort} />
      </Chat>
    </div>
  );
}
