"use client";

import { useState } from "react";
import { DonorDialog } from "./ui/donor-dialog";
import { DonorCard } from "./ui/donor-card";
import { IDonor } from "../../../../types/schema";

export function DonorsList({ donors }: { donors: IDonor[] }) {
  const [selectedDonor, setSelectedDonor] = useState<IDonor | null>(null);
  const [open, setOpen] = useState(false);

  if (donors?.length === 0) {
    return <p className="text-red-500 font-light">No donors are present</p>;
  }

  const handleOpen = (donor: IDonor) => {
    setSelectedDonor(donor);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
        {donors.map((donor) => (
          <DonorCard
            key={donor._id?.toString()}
            donor={donor}
            onClick={() => handleOpen(donor)}
          />
        ))}
      </div>

      {selectedDonor && (
        <DonorDialog donor={selectedDonor} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
