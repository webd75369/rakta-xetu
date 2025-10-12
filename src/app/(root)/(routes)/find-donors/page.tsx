import { fetchDonors } from "@/server/donors/fetch-donors";

export default async function FindDonors() {
  const donors = await fetchDonors();
  console.log(donors);
  return (
    <div>
      <p className="text-neutral-500 font-light">Find Donors</p>
    </div>
  );
}
