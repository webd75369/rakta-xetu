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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateField, DateInput } from "@/components/ui/datefield-rac";

type DateValueShape = {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
};

function dateValueToDate(val: DateValueShape | null | undefined): Date | null {
  if (!val) return null;
  const { year, month, day, hour = 0, minute = 0 } = val as DateValueShape;
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof day !== "number"
  )
    return null;
  return new Date(year, month - 1, day, hour ?? 0, minute ?? 0, 0, 0);
}

function dateToDateValue(d: Date): DateValueShape {
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  };
}

const formSchema = z.object({
  hospitalName: z.string().min(1, { message: "Hospital name is required" }),
  donationTime: z
    .any()
    .refine(
      (val) => {
        const date = dateValueToDate(val as DateValueShape | null | undefined);
        return date !== null;
      },
      { message: "Donation date and time is required" }
    )
    .refine(
      (val) => {
        const date = dateValueToDate(val as DateValueShape | null | undefined);
        return date ? date.getTime() > Date.now() : false;
      },
      { message: "Donation date and time cannot be in the past" }
    ),
});

export function ScheduleDonation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalName: "",
      donationTime: null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const scheduled = dateValueToDate(
      values.donationTime as DateValueShape | null
    );
    if (!scheduled) {
      console.error("No valid donationTime provided");
      return;
    }
    console.log({ ...values, donationTime: scheduled });
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Hospital Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Apollo Hospitals" {...field} />
                    </FormControl>
                    <FormDescription className="font-light">
                      Enter your hospital name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">
                      Schedule Donation
                    </FormLabel>
                    <FormControl>
                      <DateField
                        className="*:not-first:mt-2"
                        granularity="minute"
                        hourCycle={24}
                        {...field}
                      >
                        <DateInput />
                      </DateField>
                    </FormControl>
                    <FormDescription className="font-light">
                      Enter the donation date and time
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
