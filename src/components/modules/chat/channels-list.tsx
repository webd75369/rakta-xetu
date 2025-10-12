"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { type User } from "stream-chat";
import {
  Chat,
  ChannelList,
  useCreateChatClient,
  LoadMorePaginator,
  LoadMorePaginatorProps,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

interface Props {
  user: User;
  token: string;
}

const CustomLoadMoreButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className="my-4 flex justify-center items-center">
    <Button variant="outline" onClick={onClick}>
      Load More
    </Button>
  </div>
);

const CustomPaginator = (props: LoadMorePaginatorProps) => (
  <LoadMorePaginator {...props} LoadMoreButton={CustomLoadMoreButton} />
);

export function ChannelsList({ user, token }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const userId = user.id.toString();
  const userToken = token;

  const filters = { members: { $in: [userId] }, type: "messaging" };
  const options = { presence: true, state: true, limit: 5 };
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
    <div className="w-full max-w-xl mx-auto">
      <Chat client={client}>
        <ChannelList
          filters={filters}
          options={options}
          sort={sort}
          Paginator={CustomPaginator}
          showChannelSearch={true}
        />
      </Chat>
    </div>
  );
}
