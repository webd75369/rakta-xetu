"use client";

import { IUser } from "../../../../types/schema";

export function DonorsList({ donors }: { donors: IUser[] }) {
  return (
    <div>
      <p className="text-neutral-500 font-light">Donors List</p>
    </div>
  );
}
