"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDonor } from "../../../../../types/schema";
import {
  ArrowUpRight,
  CalendarCheck,
  Droplet,
  Mail,
  MapPin,
  MessageSquareShare,
  PhoneCall,
  User,
  VenusAndMars,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DonorDialogProps {
  donor: IDonor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonorDialog({ donor, open, onOpenChange }: DonorDialogProps) {
  if (!donor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-600 font-light">
            Donor Information
          </DialogTitle>
          <DialogDescription className="font-light text-neutral-500">
            These are the basic information about the donor
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <User size={16} className="text-rose-500" />
            <div>Full Name: {donor.user.name}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <Mail size={16} className="text-rose-500" />
            <div>Email: {donor.user.email}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <VenusAndMars size={16} className="text-rose-500" />
            <div>
              Gender: {donor.gender[0].toUpperCase() + donor.gender.slice(1)}
            </div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <CalendarCheck size={16} className="text-rose-500" />
            <div>Date of Birth: {donor.dateOfBirth}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <Droplet size={16} className="text-rose-500" />
            <div>Blood Group: {donor.bloodGroup}</div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-neutral-600 font-light text-sm">
            <PhoneCall size={16} className="text-rose-500" />
            <div>Phone Number: {donor.phoneNumber}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" asChild>
            <Link
              href={`/chat/${donor.user._id?.toString()}`}
              className="flex justify-center items-center gap-x-2"
            >
              Chat Now
              <MessageSquareShare />
            </Link>
          </Button>
          <Button className="flex justify-center items-center gap-x-2">
            Send Request
            <ArrowUpRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
