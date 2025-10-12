"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "../../../../types/schema";
import initials from "initials";

export function DonorsList({ donors }: { donors: IUser[] }) {
  if (donors?.length === 0) {
    return <p className="text-red-500 font-light">No donors are present</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
      {donors.map((donor: IUser) => (
        <div
          className="p-3 rounded-lg border hover:bg-sidebar transition-all w-full"
          key={donor._id?.toString()}
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex justify-center items-center gap-x-4">
              <Avatar>
                <AvatarImage src={donor.image} />
                <AvatarFallback>{initials(donor.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-between">
                <p className="text-sm text-neutral-500 font-light">
                  {donor.name}
                </p>
                <p className="text-xs text-neutral-400 font-extralight">
                  {donor.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <p className="text-sm text-rose-500 font-light">B+</p>
              <p className="text-xs text-neutral-500 font-extralight">
                Contact
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
