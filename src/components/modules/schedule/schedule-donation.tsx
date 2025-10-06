"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ScheduleDonation() {
  return (
    <div className="my-4">
      <Button
        className="flex justify-center items-center gap-x-2"
        variant="secondary"
      >
        <span>Schedule Donation</span>
        <Plus />
      </Button>
    </div>
  );
}
