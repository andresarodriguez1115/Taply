import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import ActivateClaim from "@/components/ActivateClaim";

export default async function ActivatePage(props) {
  const { id } = await props.searchParams;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center px-6">
        <p className="text-gray-500">Invalid activation link.</p>
      </div>
    );
  }

  const { data: device } = await supabase
    .from("devices")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!device) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center px-6">
        <p className="text-gray-500">This card isn't recognized. Contact support.</p>
      </div>
    );
  }

  // Already claimed — redirect straight to the profile
  if (device.user_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("user_id", device.user_id)
      .eq("is_active", true)
      .maybeSingle();

    if (profile?.username) {
      redirect(`/${profile.username}`);
    }

    return (
      <div className="flex items-center justify-center min-h-screen text-center px-6">
        <p className="text-gray-500">No active profile set for this card yet.</p>
      </div>
    );
  }

  // Not claimed yet — hand off to the client-side claim flow
  return <ActivateClaim deviceId={device.id} productType={device.product_type} />;
}