"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { Button } from "@/components/ui/button";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  gender: z.enum(["male", "female", "other"], "Gender is required"),
  blood: z.enum(bloodGroups, "Blood group is required"),
  dob: z.any().refine((val) => !!val, "Date of birth is required"),
  location: z.string().min(2, "Address is required"),
});

export function OnboardingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      gender: undefined,
      blood: "",
      dob: null,
      location: "",
    },
  });

  const onSubmit: (values: z.infer<typeof formSchema>) => void = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-6 w-full space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600 font-light">
                Enter your name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600 font-light">
                Enter your phone number
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter your phone number"
                  defaultCountry="IN"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center items-center gap-x-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-neutral-600 font-light">
                  Select your gender
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full" id="gender">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blood"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-neutral-600 font-light">
                  Select your Blood Group
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full" id="blood">
                      <SelectValue placeholder="Blood Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600 font-light">
                Enter your Date Of Birth
              </FormLabel>
              <FormControl>
                <DateField
                  value={field.value}
                  onChange={field.onChange}
                  id="dob"
                  name="dob"
                >
                  <DateInput />
                </DateField>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600 font-light">
                Enter your address
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" className="w-full" type="submit">
          Complete Onboarding
        </Button>
      </form>
    </Form>
  );
}
