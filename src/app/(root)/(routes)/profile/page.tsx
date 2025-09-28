import { ChartComponent } from "@/components/modules/stats/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileInfo } from "@/server/profile";

export default async function Profile() {
  const info = await getProfileInfo();
  return (
    <div>
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
    </div>
  );
}
