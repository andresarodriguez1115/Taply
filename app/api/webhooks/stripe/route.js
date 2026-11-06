import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PAID_MODES = ["networking", "university", "social"]
const PAID_FEATURES = ["qr"]

const setTierBySub = (subId, tier) =>
  supabaseAdmin
    .from("accounts")
    .update({ subscription_tier: tier })
    .eq("stripe_subscription_id", subId)

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.client_reference_id || session.metadata?.userId
        if (!userId) break

        // ONE-TIME $2.99 MODE UNLOCK → add the mode only (never Pro)
        if (session.mode === "payment" && session.metadata?.type === "mode_unlock") {
          if (session.payment_status !== "paid") break
          const mode = session.metadata.mode
          if (!PAID_MODES.includes(mode)) break

          const { data: acc } = await supabaseAdmin
            .from("accounts")
            .select("unlocked_modes")
            .eq("user_id", userId)
            .maybeSingle()

          const current = acc?.unlocked_modes || []
          if (current.includes(mode)) break

          await supabaseAdmin
            .from("accounts")
            .upsert({
              user_id: userId,
              unlocked_modes: [...current, mode],
              ...(session.customer ? { stripe_customer_id: session.customer } : {}),
            })
          break
        }

        // ONE-TIME FEATURE UNLOCK (QR, etc.) → add the feature only (never Pro)
        if (session.mode === "payment" && session.metadata?.type === "feature_unlock") {
          if (session.payment_status !== "paid") break
          const feature = session.metadata.feature
          if (!PAID_FEATURES.includes(feature)) break

          const { data: acc } = await supabaseAdmin
            .from("accounts")
            .select("unlocked_features")
            .eq("user_id", userId)
            .maybeSingle()

          const current = acc?.unlocked_features || []
          if (current.includes(feature)) break

          await supabaseAdmin
            .from("accounts")
            .upsert({
              user_id: userId,
              unlocked_features: [...current, feature],
              ...(session.customer ? { stripe_customer_id: session.customer } : {}),
            })
          break
        }

        // SUBSCRIPTION (incl. 14-day trial) → Pro
        if (session.mode === "subscription") {
          await supabaseAdmin
            .from("accounts")
            .upsert({
              user_id: userId,
              subscription_tier: "pro",
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              trial_used: true,
            })
        }
        break
      }

      // Trial ended, payment failed, reactivated, etc.
      case "customer.subscription.updated": {
        const subscription = event.data.object
        const isActive = ["active", "trialing"].includes(subscription.status)
        await setTierBySub(subscription.id, isActive ? "pro" : "free")
        break
      }

      case "customer.subscription.deleted": {
        await setTierBySub(event.data.object.id, "free")
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const subId =
          invoice.subscription || invoice.parent?.subscription_details?.subscription
        if (subId) await setTierBySub(subId, "free")
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}