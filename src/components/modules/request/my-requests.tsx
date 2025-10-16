"use client";

import { cn } from "@/lib/utils";
import { IBlood } from "../../../../types/schema";

interface Props {
  requests: IBlood[];
}

export function MyRequestsList({ requests }: Props) {
  if (requests.length === 0) {
    return (
      <div className="my-4">
        <p className="text-rose-500 font-light">
          You have not made any request
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 w-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
        {requests.map((request: IBlood) => (
          <div
            key={request._id?.toString()}
            className="p-4 rounded-lg bg-sidebar flex justify-between items-center w-full"
          >
            <div className="flex flex-col items-start justify-center gap-0.5">
              <p className="text-neutral-600 text-sm font-light">
                {request.age} year old {request.gender}
              </p>
              <p className="text-neutral-600 text-sm font-light">
                {request.units} Unit Blood
              </p>
              <p className="text-xs text-neutral-500 font-light max-w-[160px] truncate">
                {request.location}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end gap-y-4">
              <p className="text-rose-500 font-light text-sm">
                {request.bloodGroup}
              </p>
              <div
                className={cn(
                  "p-1 rounded text-xs font-light",
                  request.isCritical
                    ? "text-rose-500 bg-rose-100/80"
                    : "text-amber-400 bg-amber-100/80"
                )}
              >
                {request.isCritical ? "Critical" : "Not Critical"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
