"use client";

import { useState } from "react";
import { MyRequestCard } from "./ui/my-request-card";
import { MyRequestDialog } from "./ui/my-request-dialog";
import { IBlood } from "../../../../types/schema";

interface Props {
  requests: IBlood[];
}

export function MyRequestsList({ requests }: Props) {
  const [selected, setSelected] = useState<IBlood | null>(null);
  const [open, setOpen] = useState(false);

  if (!requests || requests.length === 0) {
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
          <MyRequestCard
            key={request._id?.toString()}
            request={request}
            onClick={() => {
              setSelected(request);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {selected && (
        <MyRequestDialog
          request={selected}
          open={open}
          setOpen={setOpen}
          onOpenChange={(val: boolean) => setOpen(val)}
        />
      )}
    </div>
  );
}
