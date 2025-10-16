import { MyRequestsList } from "@/components/modules/request/my-requests";
import { myRequests } from "@/server/request/my-requests";

export default async function MyRequests() {
  const result = await myRequests();
  return (
    <div className="w-full">
      <p className="text-neutral-500 text-2xl font-light">My Requests</p>
      <MyRequestsList requests={result} />
    </div>
  );
}
