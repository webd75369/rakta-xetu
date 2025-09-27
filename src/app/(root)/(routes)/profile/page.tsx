import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <div className="flex justify-center items-center my-6">
        <div className="flex flex-col justify-center items-center text-center gap-y-3">
          <h1 className="text-xl text-neutral-600 font-light">
            {session?.user.name}
          </h1>
          <h2 className="text-sm text-neutral-500 font-light">
            {session?.user.email}
          </h2>
        </div>
      </div>
    </div>
  );
}
