"use client";

interface TokenItem {
  token: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  message?: undefined;
}

interface MessageItem {
  message: string;
  token?: undefined;
  user?: undefined;
}

type Props = TokenItem | MessageItem;

export function ChatComponent({ items }: { items: Props }) {
  return (
    <div>
      <p>Chat Component</p>
    </div>
  );
}
