import { DonorsList } from "@/components/modules/donors/donors-list";
import { fetchDonors } from "@/server/donors/fetch-donors";

export default async function FindDonors() {
  const donors = await fetchDonors();
  return (
    <div>
      <p className="text-neutral-500 text-2xl font-light">Find Donors</p>
      <DonorsList donors={donors} />
    </div>
  );
}
