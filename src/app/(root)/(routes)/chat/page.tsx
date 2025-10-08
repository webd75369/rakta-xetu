import { listUsers } from "@/server/user/user";

export default async function ChatPage() {
  const users = await listUsers();
  console.log(users);
  return (
    <div>
      <p className="text-neutral-500">Chat</p>
    </div>
  );
}
