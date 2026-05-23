import { createClient } from "@supabase/supabase-js";
import BusinessLayout from "@/components/layouts/BusinessLayout";
import UniversityLayout from "@/components/layouts/UniversityLayout";
import SocialLayout from "@/components/layouts/SocialLayout";
import NetworkingLayout from "@/components/layouts/NetworkingLayout";
import MinimalLayout from "@/components/layouts/MinimalLayout";

export default async function PublicProfile(props) {
  const { username } = await props.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const normalizedUsername = username?.toLowerCase();

  if (!normalizedUsername) {
    return <div>Invalid username</div>;
  }

// 1. try to get active profile
// 1. get user_id from ANY profile with that username


// 2. get ACTIVE profile for that user_id


let { data: profile } = await supabase
  .from("profiles")
  .select("*")
  .eq("username", normalizedUsername)
  .eq("is_active", true)
  .maybeSingle();



if (!profile) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>No active profile set</p>
    </div>
  );
}
// LOG VIEW
await supabase
  .from("profile_events")
  .insert({ profile_id: profile.id, event_type: "view" });
const layoutProps = {
  name: profile.name,
  title: profile.title,
  fields: profile.fields,
  fieldValues: profile.field_values,
  isEditing: false,
  profileId: profile.id,

  backgroundColor: profile.bg_color || "#f3f4f6",

  avatarUrl: profile.avatar_url,
  bannerUrl: profile.banner_url,

  layout: profile.layout || "modern",

  profileScale: profile.avatar_scale ?? 1,
  profilePos: {
    x: profile.avatar_x ?? 0,
    y: profile.avatar_y ?? 0,
  },

  bannerScale: profile.banner_scale ?? 1,
  bannerPos: {
    x: profile.banner_x ?? 0,
    y: profile.banner_y ?? 0,
  },
};

  switch (profile.mode) {
case "business": {
  const LayoutComponent =
    profile.layout === "minimal"
      ? MinimalLayout
      : profile.layout === "executive"
      ? BusinessLayout
      : BusinessLayout; // default modern handled inside BusinessLayout

  return (
    <div
      suppressHydrationWarning
      style={{ background: profile.bg_color || "#f3f4f6" }}
      className="min-h-screen"
    >
      <LayoutComponent
        {...layoutProps}
        profileImage={profile.avatar_url}
        bannerImage={profile.banner_url}
      />
    </div>
  );
}
case "university":
      return (
        <UniversityLayout
          {...layoutProps}
          profileImage={profile.avatar_url}
        />
      );
    case "social":
      return (
        <SocialLayout
          {...layoutProps}
          profileImage={profile.avatar_url}
          profileScale={profile.avatar_scale ?? 1}
          profilePos={{
            x: profile.avatar_x ?? 0,
            y: profile.avatar_y ?? 0,
          }}
        />
      );
case "networking":
  return (
    <NetworkingLayout
      {...layoutProps}
      backgroundColor={profile.networking_bg || profile.bg_color}
      profileImage={profile.avatar_url}
      profileScale={profile.networking_scale ?? 1}
      profilePos={{
        x: profile.networking_x ?? 0,
        y: profile.networking_y ?? 0,
      }}
      nameColor={profile.networking_name_color || "#000000"}
      titleColor={profile.networking_title_color || "#6b7280"}
    />
  );
      return <BusinessLayout {...layoutProps} />;
  }
}