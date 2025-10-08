import { SearchUsers } from "@/components/modules/chat/searchbar";
import { listUsers } from "@/server/user/user";

export default async function ChatPage() {
  const users = await listUsers();
  return (
    <div className="w-full">
      <SearchUsers />
    </div>
  );
}
