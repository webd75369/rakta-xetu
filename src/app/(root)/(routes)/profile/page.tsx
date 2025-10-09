import { DonationStatus } from "@/components/modules/profile/donation-status";
import { ChartComponent } from "@/components/modules/stats/chart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileInfo } from "@/server/user/profile";
import { AlertTriangle, BrainCircuit, Coins } from "lucide-react";
import Link from "next/link";

export default async function Profile() {
  const info = await getProfileInfo();

  return (
    <div className="w-full">
      <div className="flex justify-center items-center my-6">
        <div className="flex flex-col justify-center items-center text-center gap-y-3">
          <h1 className="text-xl text-neutral-600 font-light">
            {!info.name ? <Skeleton className="w-[160px] h-3" /> : info.name}
          </h1>
          <h2 className="text-sm text-neutral-500 font-light">
            {!info.email ? <Skeleton className="w-[220px] h-3" /> : info.email}
          </h2>
          <p className="text-neutral-500 font-light">
            Blood Group:{" "}
            <span className="text-rose-500">
              {!info.bloodGroup ? (
                <Skeleton className="h-3 w-3 rounded" />
              ) : (
                info.bloodGroup
              )}
            </span>
          </p>
        </div>
      </div>
      <ChartComponent />
      <DonationStatus />
      <div className="my-6 flex justify-center items-center gap-x-3">
        <Button variant="outline" asChild>
          <Link
            href="/profile/complaint"
            className="flex justify-center items-center gap-x-2 text-neutral-500"
          >
            <span className="font-light">Make a Complaint</span>
            <AlertTriangle />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="/profile/chat"
            className="flex justify-center items-center gap-x-2 text-neutral-500"
          >
            <span className="font-light">Chat with our AI</span>
            <BrainCircuit />
          </Link>
        </Button>
      </div>
      <div className="my-6 flex justify-center items-center">
        <Button variant="secondary" asChild>
          <Link
            href="/profile/donate-us"
            className="flex justify-center items-center gap-x-2"
          >
            <span>Donate Us</span>
            <Coins />
          </Link>
        </Button>
      </div>
    </div>
  );
}
