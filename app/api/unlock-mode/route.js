import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PAID_MODES = ["networking", "university", "social"];

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return Response.json({ error: "Not signed in" }, { status: 401 });

    const { mode } = await req.json();
    if (!PAID_MODES.includes(mode)) return Response.json({ error: "Invalid mode" }, { status: 400 });

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("subscription_tier, unlocked_modes, stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (account?.subscription_tier === "pro" || account?.unlocked_modes?.includes(mode)) {
      return Response.json({ error: "Already unlocked" }, { status: 400 });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://taply.now";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_MODE_UNLOCK, quantity: 1 }],
      ...(account?.stripe_customer_id
        ? { customer: account.stripe_customer_id }
        : { customer_email: user.email, customer_creation: "always" }),
      client_reference_id: user.id,
      metadata: { type: "mode_unlock", userId: user.id, mode },
      success_url: `${site}/create?unlocked=${mode}`,
      cancel_url: `${site}/create`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    console.error("Unlock checkout error:", e);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}