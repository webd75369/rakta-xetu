"use client";

import { IBlood } from "../../../../types/schema";

interface Props {
  requests: IBlood[];
}

export function MyRequestsList({ requests }: Props) {
  return (
    <div className="p-4">
      <p>My Requests</p>
    </div>
  );
}
