import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TRIAL_DAYS = 14

export async function POST(request) {
  try {
    const { plan, userId, userEmail } = await request.json()
    if (!userId) return NextResponse.json({ error: "Missing user" }, { status: 400 })

    const priceId = plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY
      : process.env.STRIPE_PRICE_MONTHLY

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("subscription_tier, stripe_customer_id, stripe_subscription_id, trial_used")
      .eq("user_id", userId)
      .maybeSingle()

    if (account?.subscription_tier === "pro") {
      return NextResponse.json({ error: "Already Pro" }, { status: 400 })
    }

    // One free trial per account, ever
    const trialEligible = !account?.trial_used && !account?.stripe_subscription_id

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(account?.stripe_customer_id
        ? { customer: account.stripe_customer_id }
        : { customer_email: userEmail }),
      client_reference_id: userId,
      metadata: { type: "pro", userId },
      ...(trialEligible ? { subscription_data: { trial_period_days: TRIAL_DAYS } } : {}),
      payment_method_collection: "always",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upgrade`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}