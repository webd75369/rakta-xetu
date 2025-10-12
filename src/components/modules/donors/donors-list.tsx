"use client";

import { useEffect, useMemo, useState } from "react";
import { DonorDialog } from "./ui/donor-dialog";
import { DonorCard } from "./ui/donor-card";
import { IDonor } from "../../../../types/schema";
import { useSearchDonors } from "@/store/search-donors";
import { Button } from "@/components/ui/button";

export function DonorsList({ donors }: { donors: IDonor[] }) {
  const { searchDonor } = useSearchDonors();
  const [selectedDonor, setSelectedDonor] = useState<IDonor | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const donorsSafe = donors ?? [];
  if (donorsSafe.length === 0) {
    return <p className="text-red-500 font-light">No donors are present</p>;
  }

  const handleOpen = (donor: IDonor) => {
    setSelectedDonor(donor);
    setOpen(true);
  };

  const filteredDonors = useMemo(
    () =>
      donorsSafe.filter((donor: IDonor) =>
        donor.user.name.toLowerCase().includes(searchDonor.toLowerCase())
      ),
    [donorsSafe, searchDonor]
  );

  const totalPages = Math.max(1, Math.ceil(filteredDonors.length / limit));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const paginatedDonors = useMemo(
    () => filteredDonors.slice((page - 1) * limit, page * limit),
    [filteredDonors, page]
  );

  useEffect(() => {
    if (!open) setSelectedDonor(null);
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
        {paginatedDonors.map((donor) => (
          <DonorCard
            key={donor._id?.toString()}
            donor={donor}
            onClick={() => handleOpen(donor)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-neutral-500 font-light text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {selectedDonor && (
        <DonorDialog donor={selectedDonor} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
