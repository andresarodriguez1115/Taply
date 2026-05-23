export const logEvent = (profileId, eventType) => {
  if (!profileId) return;
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profile_events`;
    const data = JSON.stringify({ profile_id: profileId, event_type: eventType });
    const blob = new Blob([data], { type: "application/json" });
    navigator.sendBeacon(url + `?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, blob);
  } catch (e) {
    console.log("logEvent error:", e);
  }
};