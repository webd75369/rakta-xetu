"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDonor } from "../../../../../types/schema";

interface DonorDialogProps {
  donor: IDonor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonorDialog({ donor, open, onOpenChange }: DonorDialogProps) {
  if (!donor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{donor.user.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2 text-sm text-neutral-600">
          <p>
            <span className="font-medium">Blood Group:</span> {donor.bloodGroup}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {donor.gender}
          </p>
          <p>
            <span className="font-medium">Location:</span> {donor.location}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {donor.phoneNumber}
          </p>
          <p>
            <span className="font-medium">DOB:</span> {donor.dateOfBirth}
          </p>

          <div className="mt-4 flex gap-2">
            <a
              href={`tel:${donor.phoneNumber}`}
              className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
            >
              Call Donor
            </a>
            <a
              href={`https://wa.me/${donor.phoneNumber.replace("+", "")}`}
              target="_blank"
              className="bg-emerald-500 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
