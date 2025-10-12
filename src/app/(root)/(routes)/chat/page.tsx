import { ChannelsList } from "@/components/modules/chat/channels-list";
import { SearchUsers } from "@/components/modules/chat/searchbar";
import { UsersList } from "@/components/modules/chat/users-list";
import { getToken } from "@/server/chat/generate-token";
import { listUsers } from "@/server/user/user";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const users = await listUsers();
  const { token, user } = await getToken();
  if (!token || !user) {
    redirect("/");
  }
  return (
    <div className="w-full">
      <p className="text-lg font-light text-neutral-500 max-w-lg mx-auto mb-2">
        Find Someone to Chat With
      </p>
      <SearchUsers />
      <UsersList users={users} />
      <ChannelsList user={user} token={token} />
    </div>
  );
}
