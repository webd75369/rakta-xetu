import { RequestsList } from "@/components/modules/request/requests-list";
import { Button } from "@/components/ui/button";
import { fetchRequests } from "@/server/request/fetch-requests";
import { Droplet, User } from "lucide-react";
import Link from "next/link";

export default async function RequestBlood() {
  const requests = await fetchRequests();
  return (
    <div>
      <p className="text-neutral-500 text-2xl font-light">All Blood Requests</p>
      <div className="my-4 flex justify-start items-center gap-x-4">
        <Button asChild variant="secondary">
          <Link
            href="/request-blood/new"
            className="flex justify-center items-center gap-x-2"
          >
            <span>New Request</span>
            <Droplet />
          </Link>
        </Button>
        <Button asChild variant="tertiary">
          <Link
            href="/request-blood/my-requests"
            className="flex justify-center items-center gap-x-2"
          >
            <span>My Requests</span>
            <User />
          </Link>
        </Button>
      </div>
      <RequestsList requests={requests} />
    </div>
  );
}
