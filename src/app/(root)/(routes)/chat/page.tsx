import { SearchUsers } from "@/components/modules/chat/searchbar";
import { UsersComponent } from "@/components/modules/chat/users";
import { listUsers } from "@/server/user/user";

export default async function ChatPage() {
  const users = await listUsers();
  return (
    <div className="w-full">
      <p className="text-lg font-light text-neutral-500 max-w-lg mx-auto mb-2">
        Find Someone to Chat With
      </p>
      <SearchUsers />
      <UsersComponent users={users} />
    </div>
  );
}
