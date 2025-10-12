"use client";

import { type User } from "stream-chat";

interface Props {
  user: User;
  token: string;
}

export function ChannelsList({ user, token }: Props) {
  return (
    <div className="max-w-md mx-auto w-full">
      <p className="text-neutral-500 text-center font-light">Channels List</p>
    </div>
  );
}
