"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader, TriangleAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteAccount() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation({
    mutationKey: ["delete-account"],
    mutationFn: async () => {
      await authClient.deleteUser();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete your account");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Successfully deleted your account");
      router.push("/auth");
    },
  });
  const deleteAccount = () => mutation.mutate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex justify-center items-center gap-x-2"
        >
          <span>Delete Account</span>
          <TriangleAlert />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-neutral-600 font-normal">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-neutral-500 font-light">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={deleteAccount}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
