"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ScheduleDonation() {
  return (
    <div className="my-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="flex justify-center items-center gap-x-2"
            variant="secondary"
          >
            <span>Schedule Donation</span>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle className="font-normal text-neutral-600">
              Schedule your next donation
            </DialogTitle>
            <DialogDescription className="font-light text-neutral-500">
              Our AI Agent will automatically schedule your donation in Google
              Calendar and send an AI-generated reminder email.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
