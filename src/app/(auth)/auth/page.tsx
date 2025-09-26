import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="min-h-svh w-full flex justify-center items-center overflow-x-hidden p-4">
      <div className="max-w-sm mx-auto w-full flex flex-col gap-y-3 justify-center items-center">
        <Button variant="secondary" className="pointer-events-none">
          <HeartPulse />
        </Button>
        <h1 className="text-2xl text-neutral-600 font-light">RaktaXetu</h1>
        <p className="text-neutral-400 font-light text-center">
          Login to RaktaXetu to join the life-saving community
        </p>
        <Button
          variant="outline"
          className="flex justify-center items-center gap-x-3 w-[200px]"
        >
          <Image src="/google.svg" height={18} width={18} alt="google" />
          <span className="text-neutral-500 font-normal">
            Login With Google
          </span>
        </Button>
      </div>
    </div>
  );
}
