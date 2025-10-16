"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBlood } from "../../../../../types/schema";
import {
  CalendarCheck,
  CircleCheck,
  Droplet,
  MapPin,
  MessageSquarePlus,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RequestDialogProps {
  request: IBlood;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange: (open: boolean) => void;
}

export function RequestDialog({
  request,
  open,
  onOpenChange,
  setOpen,
}: RequestDialogProps) {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-600 font-light">
            Request Details
          </DialogTitle>
          <DialogDescription className="font-light text-neutral-500">
            Information about this blood request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <User size={16} className="text-rose-500" />
            <div>Patient Name: {request.patientName}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <Phone size={16} className="text-rose-500" />
            <div>Contact: {request.phoneNumber}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <CalendarCheck size={16} className="text-rose-500" />
            <div>Age: {request.age}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <Droplet size={16} className="text-rose-500" />
            <div>Blood Group: {request.bloodGroup}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <MapPin size={16} className="text-rose-500" />
            <div>Location: {request.location}</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" asChild>
            <Link
              href={`/chat/${request.userId?.toString() || ""}`}
              className="flex items-center gap-x-2"
            >
              Chat Now
              <MessageSquarePlus />
            </Link>
          </Button>
          <Button
            className="flex justify-center items-center gap-x-2"
            variant="tertiary"
            onClick={() => {}}
          >
            Accept
            <CircleCheck />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
