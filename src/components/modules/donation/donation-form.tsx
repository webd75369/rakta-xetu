"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Coins } from "lucide-react";

const formSchema = z.object({
  amount: z.coerce
    .number({ message: "Please enter an amount" })
    .nonnegative({ message: "Please enter a valid amount" })
    .min(10, { message: "Minimum donation is 10 Rupees" }),
});

export function DonationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<
      z.infer<typeof formSchema>,
      any
    >,
    defaultValues: {
      amount: 50,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full my-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-neutral-500">
                  Donation Amount
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter an amount"
                    {...field}
                    type="number"
                    className="no-spinner"
                  />
                </FormControl>
                <FormDescription className="font-light text-neutral-500">
                  This is your amount in Indian Rupees.
                </FormDescription>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center items-center">
            <Button
              type="submit"
              variant="secondary"
              className="flex justify-center items-center gap-x-2"
            >
              <span>Donate Now</span>
              <Coins />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
