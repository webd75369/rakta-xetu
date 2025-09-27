import { Header } from "@/components/shared/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: Children) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.isUser) {
    redirect("/onboarding");
  }
  return (
    <section className="max-w-4xl mx-auto">
      <Header />
      <div className="p-4">{children}</div>
    </section>
  );
}
