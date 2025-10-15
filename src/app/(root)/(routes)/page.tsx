import { ScheduleDonation } from "@/components/modules/schedule/schedule-donation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Features } from "../../../components/modules/home/features";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div>
      <h1 className="text-neutral-500 font-light text-xl">
        Welcome {session?.user.name}
      </h1>
      <p className="font-light text-neutral-400 my-2">How are you today?</p>
      <ScheduleDonation />
      <Features />
    </div>
  );
}
